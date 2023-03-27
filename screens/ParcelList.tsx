import { useNavigation, useRoute } from "@react-navigation/native";
import { styled } from "nativewind";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import {
  ArrowLeftIcon,
  TruckIcon,
  TvIcon,
  DevicePhoneMobileIcon,
  ClockIcon,
  ComputerDesktopIcon,
} from "react-native-heroicons/solid";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { classNames } from "../lib/utils";

import parcelsJSON from "../data/parcels.json";
import itemsJSON from "../data/item.json";

const parsedParcels = parcelsJSON.map((parcel) => {
  const deliveryDateSplit = parcel.deliveryDate.replaceAll("-", "/").split("/");
  const pickupDateSplit = parcel.pickupDate.replaceAll("-", "/").split("/");

  const deliveryDate = `${deliveryDateSplit[2]}/${deliveryDateSplit[0]}/${deliveryDateSplit[1]}`;
  const pickupDate = `${pickupDateSplit[2]}/${pickupDateSplit[0]}/${pickupDateSplit[1]}`;

  return {
    ...parcel,
    deliveryDate,
    pickupDate,
  };
});

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);
const StyledArrowLeftIcon = styled(ArrowLeftIcon);
const StyledScrollView = styled(ScrollView);
const StyledTruckIcon = styled(TruckIcon);
const StyledButton = styled(Pressable);
const StyledInput = styled(TextInput);
const StyledTvIcon = styled(TvIcon);
const StyledComputerDesktopIcon = styled(ComputerDesktopIcon);
const StyledDevicePhoneMobileIcon = styled(DevicePhoneMobileIcon);
const StyledClockIcon = styled(ClockIcon);

type ItemProps = {
  id: string;
  weight: number;
  type: string;
};

type FormType = {
  driversName: string;
  licensePlate: string;
};

function Item(props: ItemProps) {
  function getIcon(type: string) {
    if (type === "Smartwatch") {
      return <StyledClockIcon className="text-primary h-6 w-6" />;
    } else if (type === "Phone") {
      return <StyledDevicePhoneMobileIcon className="text-primary h-6 w-6" />;
    } else if (type === "PC") {
      return <StyledComputerDesktopIcon className="text-primary h-6 w-6" />;
    } else {
      return <StyledTvIcon className="text-primary h-6 w-6" />;
    }
  }

  return (
    <StyledView className="py-4 flex flex-row items-center space-x-4">
      <StyledView className="w-12 h-12 bg-primary/10 rounded-xl flex justify-center items-center">
        {getIcon(props.type)}
      </StyledView>
      <StyledView>
        <StyledText className="text-base font-medium text-[#3A3541DE]">
          {props.id}
        </StyledText>
        <StyledText className="text-[10px] text-[#3A3541DE]">
          {props.weight} kg
        </StyledText>
      </StyledView>
    </StyledView>
  );
}

export function ParcelList() {
  const [showAdd, setShowAdd] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const { control, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      driversName: "",
      licensePlate: "",
    },
  });

  const { parcelId } = route.params;

  const parcel = parsedParcels.find((parcel) => parcel.id.$oid === parcelId);
  const items = itemsJSON.filter((item) =>
    parcel?.items.flatMap((fm) => fm.$oid).includes(item.id.$oid)
  );

  function onSubmit(data: FormType) {
    reset();
    setShowAdd(false);
  }

  return (
    <StyledSafeAreaView className="h-full">
      <StyledView
        className={classNames(
          "px-7 py-3 mb-3 h-full",
          showAdd ? "bg-[#00000080]" : ""
        )}
      >
        <StyledView className="flex flex-row items-center space-x-3">
          <StyledButton onPress={() => navigation.goBack()}>
            <StyledArrowLeftIcon className="text-black" />
          </StyledButton>
          <StyledText className="text-2xl text-[#3A3541]/87">
            {parcelId} Parcel List
          </StyledText>
        </StyledView>
        <StyledScrollView className="">
          {items.map((item) => (
            <Item
              key={item.id.$oid}
              id={item.id.$oid}
              weight={item.weigth}
              type={item.type}
            />
          ))}
        </StyledScrollView>
        <StyledButton className="bg-primary rounded-md">
          <StyledText
            className="py-3 text-sm text-white text-center"
            onPress={() => setShowAdd(true)}
          >
            DELIVERY
          </StyledText>
        </StyledButton>
        <StyledView
          className={classNames(
            "h-80 bg-white absolute bottom-0 left-0 right-0 z-10 px-5 py-8 rounded-t-3xl",
            showAdd ? "flex" : "hidden"
          )}
        >
          <StyledView className="flex-grow">
            <StyledText className="text-[20px] text-[#3A3541DE] text-center mb-9">
              Delivery information
            </StyledText>
            <Controller
              control={control}
              name="driversName"
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  placeholder="Driver's name"
                  className="bg-white px-2 py-4 rounded-md border border-[#3A35413B] mb-4"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="licensePlate"
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  placeholder="License plate"
                  className="bg-white px-2 py-4 rounded-md border border-[#3A35413B]"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
          </StyledView>
          <StyledButton className="bg-primary rounded-md">
            <StyledText
              className="py-3 text-sm text-white text-center"
              onPress={handleSubmit(onSubmit)}
            >
              ADD
            </StyledText>
          </StyledButton>
        </StyledView>
      </StyledView>
    </StyledSafeAreaView>
  );
}
