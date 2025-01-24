import {
  Button,
  Container,
  H1,
  Icons,
  Input,
  TextArea,
  useMessage,
} from "cllk";
import { useForm } from "react-hook-form";
function Contact() {
  const { messagePromise } = useMessage();
  const { register, handleSubmit } = useForm();
  const giveData = async (res: any) => {
    const uri = `https://us-east-1.aws.data.mongodb-api.com/app/http-ucuki/endpoint/telegram`;
    messagePromise(
      async () => {
        await fetch(uri, {
          method: "POST",
          body: JSON.stringify({
            title: "Nueva Peticion de Cliente",
            description: JSON.stringify(res),
            telegram: 5491833550,
          }),
        });
      },
      {
        error: "Error, intenta por otros medios",
        pending: "Enviando Mensaje",
        success: "Gracias!, nos pondremos en contacto contigo",
      }
    );
  };
  return (
    <div className="max-w-[1000px] mx-auto space-y-5">
      <div className="flex justify-center flex-col space-y-5">
        <H1 span size={"4em"}>
          Tienes dudas
        </H1>
        <H1 size={"2em"}>Contactanos</H1>
      </div>
      <Container bordered>
        <div className="grid grid-cols-1 sm:grid-cols-2 mx-auto lg:px-8 sm:divide-x divide-y sm:divide-y-0 cursor-default">
          <div className="py-6 md:py-0 flex flex-col space-y-5 justify-between items-center">
            <H1 size={"2em"}>Contactanos</H1>
            <Button
              onClick={() => {
                window.open("https://m.me/104952405483178", "_blank");
              }}
              icon={<Icons icon="IconBrandMessenger" />}
            >
              Messenger
            </Button>
            <Button
              onClick={() => {
                window.open("https://wa.me/593959434867", "_blank");
              }}
              icon={<Icons icon="IconBrandWhatsapp" />}
            >
              Whatsapp
            </Button>
            <Button
              onClick={() => {
                window.open("https://t.me/llkT_bot", "_blank");
              }}
              icon={<Icons icon="IconBrandTelegram" />}
            >
              Telegram
            </Button>
            <Button
              onClick={() => {
                window.location.href = "tel:+593959434867";
              }}
              icon={<Icons icon="IconCell" />}
            >
              Telefono
            </Button>
          </div>
          <form
            onSubmit={handleSubmit(giveData)}
            className="flex flex-col md:py-0 w-full mx-auto py-5 md:px-10"
          >
            <H1 size={"2em"}>Enviar Mensaje</H1>
            <Input register={register} name="name" label="Nombre" />
            <Input
              register={register}
              name="email"
              type="email"
              label="Email"
            />

            <TextArea
              register={register}
              name="message"
              label="Descripcion"
              required
            />

            <Button
              className="mt-5"
              type="submit"
              icon={<Icons icon="IconSend" />}
              center
              onClick={giveData}
            >
              Enviar
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default Contact;
