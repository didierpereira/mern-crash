import {Container,Link,SimpleGrid,Text,VStack} from "@chakra-ui/react"
import {useEffect} from "react"
import ProductCard from "../../components/ProductCard/ProductCard"
import {useProdcutStore} from "../../store/product"

const HomePage = () => {
  const {fetchProducts,products}= useProdcutStore()

  useEffect(()=>{
    fetchProducts()
  },[fetchProducts])

  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
         <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
          >
            Current Products
          </Text>

          {products.length > 0 ? (
              <SimpleGrid
                columns={{
                  base:1,
                  md:2,
                  lg:3,
                }}
                spacing={8}
              >
                {products.map((product)=>(
                  <ProductCard key={product._id} product={product} />
                ))}
              </SimpleGrid>
            )
              :
            (
              <Text fontSize={"xl"} textAlign={"center"} fontWeight={"bold"} color={"gray.500"}>
                No products found {" "}
                <Link href={"/create"}>
                  <Text as={"span"} color="blue.500" _hover={{ textDecoration: "underline" }}>
                    Create a Product
                  </Text>
                </Link>
              </Text>
            )}
      </VStack>
    </Container>
  )
}

export default HomePage