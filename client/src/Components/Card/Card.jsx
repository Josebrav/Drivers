import { Link } from 'react-router-dom';
import { Card, CardBody, Stack, Heading, Text, Button, Image, Divider } from '@chakra-ui/react';

export default function Carta({ id, name, image, teams, dob }) {
    return (

        <Link to={`/detail/${id}`}>
            <Card  border={"solid"} borderColor={"white"} bg={'rgb(233 20 20 / 90%)'} w={"240px"} h={"440px"} m={"30px"} p={"30px"} borderRadius={"20px"}>
                <CardBody>
                    <Image
                        src={image}
                        alt={name}
                        borderRadius='lg'
                        h={"190px"}
                        w={"240px"}
                        mt='3' spacing='3' align="center"
                    />
                    <Stack mt='3' spacing='3' align="center"> {/* Alinea los elementos al centro */}
                        <Heading size='md'
                         color={"black"}
                         bg='rgb(255 255 255 / 60%)' 
                         borderRadius={"10px"}
                         padding={"3px"}
                         border={"solid"}
                         borderColor={"black"}
                         >{name}</Heading>
                        
                        <Text color={"black"}>
                            Teams: {teams}
                        </Text>
                        <Text color='black' fontSize='2xl'>
                            Fecha de nacimiento: {dob}
                        </Text>
                      
                    </Stack>
                </CardBody>
                <Divider />
            </Card>


        </Link>

    );
}
