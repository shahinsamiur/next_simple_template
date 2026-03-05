"use client";
import { toast } from "react-toastify";
import Button from "../utils/Button";
import ContainerWraper from "../utils/containerWraper";
export default function page() {
  return (
    <ContainerWraper>
      <h1>hello samiur shahin</h1>
      <Button onClick={() => toast.success("some one clicked me ")}>
        click me
      </Button>
    </ContainerWraper>
  );
}
