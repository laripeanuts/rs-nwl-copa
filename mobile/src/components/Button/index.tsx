import { Fontisto } from "@expo/vector-icons";
import { Button as ButtonNativeBase, Icon, Text } from "native-base";
import { IButtonProps } from "native-base/lib/typescript/components/primitives/Button/types";

interface ButtonProps extends IButtonProps {
  title: string;
  icon: string;
  type?: "primary" | "secondary";
}

export const Button = ({
  title,
  icon,
  type = "primary",
  ...rest
}: ButtonProps) => {
  return (
    <ButtonNativeBase
      width={80}
      height={14}
      borderRadius={8}
      rounded="sm"
      padding={0}
      margin={0}
      leftIcon={<Icon as={Fontisto} name={icon} size="md" color="white" />}
      bg={type === "primary" ? "yellow.500" : "red.500"}
      _pressed={{ bg: type === "primary" ? "yellow.600" : "red.600" }}
      _loading={{ _spinner: { color: "white" } }}
      {...rest}
    >
      <Text
        color={type === "primary" ? "black" : "white"}
        fontSize="sm"
        fontFamily="heading"
        textTransform="uppercase"
      >
        {title}
      </Text>
    </ButtonNativeBase>
  );
};
