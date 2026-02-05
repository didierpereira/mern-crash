import {Box,Button,Container,Heading,Input,useColorModeValue,useToast,VStack} from "@chakra-ui/react"
import {useState} from "react"
import {useProdcutStore} from "../../store/product"

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name:"",
    price:0,
    image:"",
  })

  const {createProduct} = useProdcutStore()
  const toast = useToast()

  const handleCreateProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if(!success){
      toast({
        title:"Error",
        description:message,
        status:"error",
        isClosable:true
      })
    } else {
      toast({
        title:"Success",
        description:message,
        status:"success",
        isClosable:true
      })
    }
  }

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>

        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} shadow={"md"} rounded={"lg"}>
          <VStack spacing={4}>
            <Input placeholder={'Product name'} name={"name"} value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />

            <Input placeholder={'Product price'} name={"price"} value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />

            <Input placeholder={'Product image'} name={"image"} value={newProduct.image} onChange={(e) => setNewProduct({...newProduct, image: e.target.value})} />

            <Button colorScheme={"blue"} w={"full"} onClick={handleCreateProduct}>Add Product</Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage