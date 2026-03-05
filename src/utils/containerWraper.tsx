import React from "react";

export default function ContainerWraper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx">
      <section>{children}</section>
    </div>
  );
}
