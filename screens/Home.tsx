import { StatusBar } from "expo-status-bar";
import { ParcelItem } from "../components/ParceListslItem";
import { useState } from "react";
import { classNames } from "../lib/utils";
import { Controller, useForm } from "react-hook-form";
import { PlusIcon } from "react-native-heroicons/solid";
import { styled } from "nativewind";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import parcelsJSON from "../data/parcels.json";

type FormType = {
  id: string;
  carrierId: string;
};

// VIEWS
const StyledView = styled(View);
const StyledSafeAreaView = styled(SafeAreaView);
const StyledScrollView = styled(ScrollView);

// FORMS
const StyledInput = styled(TextInput);

// OTHERS
const StyledText = styled(Text);
const StyledButton = styled(Pressable);

// ICONS
const StyledPlusIcon = styled(PlusIcon);

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

export function Home() {
  const [parcels, setParcels] = useState(parsedParcels);
  const [showAdd, setShowAdd] = useState(false);

  const { control, handleSubmit, reset } = useForm<FormType>({
    defaultValues: {
      id: "",
      carrierId: "",
    },
  });

  function onSubmit(data: FormType) {
    reset();
    setShowAdd(false);
  }

  return (
    <StyledSafeAreaView className="h-full">
      <StyledView
        className={classNames(
          "px-7 py-3 h-full",
          showAdd ? "bg-[#00000080]" : ""
        )}
      >
        <StyledText className="text-2xl text-[#3A3541]/87 mb-3">
          Parcel Lists
        </StyledText>
        <StyledScrollView pointerEvents={showAdd ? "none" : "auto"}>
          {parcels.map((parcel, idx) => (
            <StyledView key={parcel.id.$oid}>
              {idx !== 0 ? (
                <StyledView className="h-[1px] w-full bg-[#3A35411F]" />
              ) : null}
              <ParcelItem
                id={parcel.id.$oid}
                deliveryDate={parcel.deliveryDate}
                pickupDate={parcel.pickupDate}
                totalItems={10}
              />
            </StyledView>
          ))}
        </StyledScrollView>
        <StyledView className="flex items-center pt-5">
          <StyledButton
            className="p-4 bg-primary text-white h-12 w-12 rounded-full flex items-center justify-center"
            onPress={() => setShowAdd(true)}
          >
            <StyledPlusIcon className="text-white" />
          </StyledButton>
        </StyledView>
        <StyledView
          className={classNames(
            "h-80 bg-white absolute bottom-0 left-0 right-0 z-10 px-5 py-8 rounded-t-3xl",
            showAdd ? "flex" : "hidden"
          )}
        >
          <StyledView className="flex-grow">
            <StyledText className="text-[20px] text-[#3A3541DE] text-center mb-9">
              Parcel and carrier information
            </StyledText>
            <Controller
              control={control}
              name="id"
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  placeholder="ID"
                  className="bg-white px-2 py-4 rounded-md border border-[#3A35413B] mb-4"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            <Controller
              control={control}
              name="carrierId"
              render={({ field: { onChange, onBlur, value } }) => (
                <StyledInput
                  placeholder="Carrier ID"
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
      <StatusBar style="auto" />
    </StyledSafeAreaView>
  );
}
