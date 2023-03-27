import dayjs from "dayjs";
import { Pressable, Text, View } from "react-native";
import isToday from "dayjs/plugin/isToday";
import { styled } from "nativewind";
import { useNavigation } from "@react-navigation/native";

dayjs.extend(isToday);

type ParcelItemProps = {
  id: string;
  deliveryDate: string;
  pickupDate: string;
  totalItems: number;
};

const StyledText = styled(Text);
const StyledButton = styled(Pressable);

export function ParcelItem(props: ParcelItemProps) {
  const navigation = useNavigation();

  return (
    <StyledButton
      className="flex flex-row justify-between items-center py-4"
      onPress={() =>
        navigation.navigate("ParcelList", {
          parcelId: props.id,
        })
      }
    >
      <View>
        <StyledText className="text-base font-medium text-[#3A3541DE]">
          Parcel List {dayjs(props.deliveryDate).format("DD/MM/YYYY")}
        </StyledText>
        <StyledText className="text-[10px] text-[#3A3541DE]">
          4 carriers will pick up the parcel{" "}
          {dayjs(props.pickupDate).isToday() ? "today" : props.pickupDate}
        </StyledText>
        <StyledText className="text-[10px] text-[#3A3541DE]">
          {props.totalItems} items
        </StyledText>
      </View>
      <StyledText className="text-[10px] text-primary font-medium">
        {dayjs(props.deliveryDate).format("DD/MM/YYYY")}
      </StyledText>
    </StyledButton>
  );
}
