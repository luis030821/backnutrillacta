import { Button, Container, H1, P } from "cllk";
import React from "react";

function Suscription() {
  return (
    <div className="space-y-10">
      <div>
        <H1 span size={"3em"}>
          Princing plans
        </H1>
      </div>
      <div className="w-10/12 mx-auto">
        <P>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis et a
          perferendis, sunt officiis totam non ipsam ad doloribus nihil
          necessitatibus ipsum veritatis eos dolorem eligendi consectetur.
          Asperiores, nemo vitae?
        </P>
      </div>
      <div className="flex justify-evenly">
        <Container bordered>
          <H1>Free</H1>
          <P>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Non
            doloremque praesentium suscipit eum ipsa nisi maxime minus
            exercitationem ut alias. Porro eos quisquam, id voluptates ratione
            voluptate vero facere. Alias!
          </P>
          <H1 position="text-left">1gb gratis</H1>
        </Container>
        <Container bordered>
          <H1>Pay as you go</H1>
          <P>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
            temporibus sunt aspernatur, et incidunt facere odio consequatur
            aliquam neque, libero ad quod commodi saepe illo doloribus at,
            deserunt reprehenderit corporis.
          </P>
          <H1 position="text-left">0.50cent per gb </H1>
        </Container>
      </div>
    </div>
  );
}

export default Suscription;
