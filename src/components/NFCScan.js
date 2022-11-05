import React, {useEffect, useState}from 'react'
import styled from 'styled-components'
import logo from '../TMNYC_W@2x.png'
import { useParams } from 'react-router-dom'
import { 
    useClaimedNFTs,
    useClaimedNFTSupply, 
    useUnclaimedNFTSupply,
    useAddress, // use addresss allows us to see if th euser is connected to the application 
    useMetamask, // allows user to connect to metamask wallet
    useDisconnect,
    useContract
} from "@thirdweb-dev/react";
import Spinner from './Spinner'
import { merchandise } from '../merchData'

const Container = styled.div`

    width: 100%;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: black;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    

`

const Wrapper = styled.div`
    
    width: 25rem;
    position: relative;
    
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 800px){
        
        width: 300px;
        flex-direction: column;
        
    }
    
`

const Left =  styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Right =  styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 30px;
`
const Logo = styled.img`
   
    width: 116px;
    height: 77px;
    margin-bottom: 5px;

    

    @media screen and (max-width: 800px)
    {
        width: 86px;
        height: 47px;
        
        
    }


`

const Image = styled.img`

    height: 400px;
    width: 400x;
    

    @media screen and (max-width: 800px)
    {
        height: 300px;
        width: 300px;
    }
`

const Button = styled.button`
        height: 66px;
        width: 327px;
        cursor: pointer;
        padding: 10px;
        margin-bottom: 20px;
        font-weight: bold;
        border-radius: 10px;
        background-color: #D9D9D9;

    @media screen and (max-width: 800px)
    {
        height: 55px;
        width: 200px ;
    }

`

const ItemName = styled.h1`
    
    margin: 20px;
    
`

const P = styled.p`

`


const NFCScan = () => {

    const { id } = useParams();
    const product = merchandise.filter((product) =>{
        return product.productId === id.toString()
      })
    const contractAddress = product[0]?.contractAddress
    const [visualDigitalAsset, setVisualDigitalAsset] = useState(false)

    const VDAClick = () =>{
        setVisualDigitalAsset(!visualDigitalAsset)
    }
    const {contract} = useContract(contractAddress) // this is the contract instance of our drop collection 
    const [metaData, setMetadata] = useState(false)
  
    useEffect(()=>{
        if(contract)
        {
            contract.metadata.get().then(metadata => setMetadata(metadata) )
        }
    }, [contract])
    const { data: claimedNFTs, isLoading, error } = useClaimedNFTs( contract, { start: 0, count: 100 });

    //react sdk from thrid web has a nice hook called useClaimedNFTSupply
    const {data: claimedNFTSupply} = useClaimedNFTSupply(contract)

    //unClaimedNFTSUpply count 
    const {data: unclaimedNFTSupply} = useUnclaimedNFTSupply(contract)

    //connect to meta mask 

    
    const connectMetamask = useMetamask();
    const disconnectMetamask = useDisconnect();

    const [userOwnsAsset, setUserOwnsAsset] = useState(null)
    const [isloading, setIsLoading] = useState(false)
    const address = useAddress();
    
    const itemOwned = () =>{
        
        setUserOwnsAsset(false)
        setIsLoading(true)

        let ownerA = address
        for(var i = 0; i < claimedNFTs.length; i++)
        {   
            let record = claimedNFTs[i]
            if(record.owner === ownerA)
            {
                setUserOwnsAsset(true)
                console.log(record.owner)
                break;

            } 
        }
        setIsLoading(false)

    }

    if(!contract || !metaData || !claimedNFTs)
    {
      return(
      <Container>
          <Spinner  name="Loading"/>
      </Container>
      )
    }

 
    console.log(metaData)
    // useEffect(() => {

    //     var ownerA = address
        
    //     for(var i = 0; i < claimedNFTs?.length; i++)
    //     {   
    //         let record = claimedNFTs[i]
    //         if(record.owner === ownerA)
    //         {
    //             setUserOwnsAsset(true)
    //         }
    //     }

        
    //     console.log(userOwnsAsset)
    // }, [address,userOwnsAsset, claimedNFTs])

    
  return (
    
    <Container>
        <Wrapper>
        <Logo src={logo} />
            { isloading ? (<Spinner/>) :(visualDigitalAsset ? 
            (

                <>
                <Left>
                <Image src={metaData.image}/>   
                <ItemName>{metaData.name}</ItemName>
                <P>
                    {claimedNFTSupply?.toNumber()} / {" "}
                    {(claimedNFTSupply?.toNumber() || 0) + 
                    (unclaimedNFTSupply?.toNumber() || 0)}{" "}
                    Claimed
                </P>
                </Left>
            
            <Right>
                {   userOwnsAsset === null ? 
                (<Button 
                    className=""
                    onClick={()=>{connectMetamask(); itemOwned();}}>
                    Connect Wallet
                </Button> ) :

                (
                    userOwnsAsset ? <div>{metaData.description}</div> : <div>You have not yet claimed this nft</div>
                )
                    
                }
            </Right>
                </>
    
            ) :

            (
                <>
                <Left>
                <Image src={metaData.image}/>   
                <ItemName>{metaData.name}</ItemName>
            </Left>
            
            <Right>
                <Button onClick={VDAClick}> View Digital Asset</Button>
                <Button>Trading Card AR</Button>
            </Right>
                </>
            ))
            }
        </Wrapper>
    </Container>
  )
}

export default NFCScan