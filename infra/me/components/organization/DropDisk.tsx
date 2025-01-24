import useAddAsset from "@/backend/useAddAsset";
import { H1, P, Text } from "cllk";
import React, { useEffect, useState } from "react";

function DropDisk() {
  const [size, setSize] = useState<number>();
  const { getAssets } = useAddAsset();
  const fn = async () => {
    const res = await getAssets();

    setSize(res);
  };
  useEffect(() => {
    fn();
  }, []);
  return <div>{size != undefined && <FileProgress size={size} />}</div>;
}

export default DropDisk;

function FileProgress({ size }: any) {
  const sizeInGB = size / (1024 * 1024 * 8); // Convert kilobits to GB (1 byte = 8 bits)
  const progressPercentage = (sizeInGB / 5) * 100; // Calculate progress percentage

  return (
    <div>
      <Text className="text-center dark:text-white/90" type="BodyMd(Medium)">
        Espacio
      </Text>
      <progress
        className="rounded-3xl"
        max={100}
        value={progressPercentage}
        style={{ width: "100%" }}
      >
        {progressPercentage}%
      </progress>
      <P>{`${sizeInGB.toFixed(2)} GB / 5 GB`}</P>
    </div>
  );
}
