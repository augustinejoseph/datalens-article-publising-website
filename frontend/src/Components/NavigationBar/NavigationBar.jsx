import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useRadio,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import {
  React,
  PersonFill,
  AuthContext,
  useContext,
  useState,
  Logout,
  Navigate,
  fullLogo,
  useNavigate,
  useLocation,
  PencilSquare,
  BoxArrowLeft,
  PersonLinesFill
} from "../index";
import { FRONTEND_DOMAIN_NAME } from "../Admin";
const Links = [];

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function NavigationBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const currentUrl = location.pathname;
  const navigate = useNavigate();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <img
                onClick={() => {
                  navigate("/");
                }}
                style={{ maxWidth: "100%", height: "50px", cursor: "pointer" }}
                src={fullLogo}
              />
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links?.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          {/* Conditionally rendering for user */}
          {user ? (
            <Flex alignItems={"center"}>
              <Menu>
                <HStack>
                  <Link to="/login" onClick={() => navigate("/login")}>
                    <HStack>
                      <PencilSquare size={20} />
                      <span style={{marginRight:"1rem"}}>Write</span>
                    </HStack>
                  </Link>
                </HStack>

                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <PersonFill
                    size={"sm"}
                    style={{ maxWidth: "100%", height: "30px", color: "grey" , border:"1px solid grey" , borderRadius:"50px", padding: "1px" }}
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      navigate("/user/" + user?.user_name);
                    }}
                  >
                    < PersonLinesFill style={{marginRight:"1rem"}} size={20}  />
                    {user?.name}
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem
                    onClick={() => {
                      navigate("/new-article");
                    }}
                  >
                   <PencilSquare style={{marginRight:"1rem"}} size={20} />
                    <span >Write</span>
                    
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                   <BoxArrowLeft style={{marginRight:"1rem"}} size={20} />
                    <span >< Logout /></span>
                    
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ) : (
            <HStack>
              <HStack>
                <Link to="/login" onClick={() => navigate("/login")}>
                  <NavLink>Login</NavLink>
                </Link>
              </HStack>
            </HStack>
          )}
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links?.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}