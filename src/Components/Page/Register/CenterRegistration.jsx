import React from "react";
import { TEInput, TERipple, TETextarea } from "tw-elements-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const urlCenterRegister = "http://localhost:3020/auth/center/register";

export default function CenterRegistration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pi, setPi] = useState("");
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState("");
  const [address, setAddress] = useState("");
  const [cap, setCap] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  //PATCH PER CARICARE LE IMMAGINI IN CLAUDINARY
  const uploadLogoCenter = async (file, centerId) => {
    try {
      const newImg = new FormData();

      newImg.append("logo", file);

      if (centerId) {
        const response = await fetch(
          `http://localhost:3020/center/${centerId}/logo`,
          {
            method: "PATCH",
            body: newImg,
          }
        );

        if (!response.ok) {
          throw new Error(
            "Errore durante il caricamento dell'immagine su Cloudinary"
          );
        }

        const data = await response.json();
        console.log("Immagine caricata su Cloudinary:", data);
      } else {
        console.error("L'ID dell'articolo è vuoto o non valido.");
      }
    } catch (error) {
      console.error(
        "Si è verificato un errore durante il caricamento dell'immagine su Cloudinary:",
        error
      );
    }
  };

  const registerCenter = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(urlCenterRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          name,
          email,
          pi,
          address,
          cap,
          city,
          country,
          bio,
        }),
      });

      if (response.ok) {
        console.log("Registrazione riuscita con successo");

        //NAVIGO ALLA HOMEPAGE DEI BLOG
        const data = await response.json();

        await uploadLogoCenter(logo, data._id);
        navigate("/LoginCenter");
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };

  return (
    <>
      <div className="container m-10">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12 me-10">
            <form>
              {/* <!--Sign in section--> */}
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg">Sign in with</p>
              </div>

              {/* <!-- Name input --> */}
              <TEInput
                type="text"
                label="Name"
                size="lg"
                className="mb-6"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></TEInput>

              {/* <!-- Email input --> */}
              <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></TEInput>

              {/* <!--Username input--> */}
              <TEInput
                type="text"
                label="Username"
                className="mb-6"
                size="lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              ></TEInput>

              {/* <!--Password input--> */}
              <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></TEInput>

              {/* <!--PI input--> */}
              <TEInput
                type="text"
                label="P.I."
                className="mb-6"
                size="lg"
                value={pi}
                onChange={(e) => setPi(e.target.value)}
              ></TEInput>

              {/* <!--Address input--> */}
              <TEInput
                type="text"
                label="Address"
                className="mb-6"
                size="lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></TEInput>

              {/* <!--Cap input--> */}
              <TEInput
                type="text"
                label="Cap"
                className="mb-6"
                size="lg"
                value={cap}
                onChange={(e) => setCap(e.target.value)}
              ></TEInput>

              {/* <!--City input--> */}
              <TEInput
                type="text"
                label="City"
                className="mb-6"
                size="lg"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              ></TEInput>

              {/* <!--City input--> */}
              <TEInput
                type="text"
                label="Country"
                className="mb-6"
                size="lg"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              ></TEInput>

              {/* <!--Logo input--> */}
              <div className="mb-3 flex justify-center">
                <label
                  htmlFor="formFile"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                >
                  Profile Image
                </label>
                <input
                  className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                  type="file"
                  id="formFile"
                  value={logo}
                  onChange={(e) => setLogo(e.target.files[0])}
                />
              </div>

              {/* <!-- Bio --> */}
              <div className="flex justify-center">
                <div className="relative mb-3 xl:w-96">
                  <TETextarea
                    id="textareaExample"
                    label="About You"
                    rows={4}
                    onChange={(e) => setBio(e.target.value)}
                  ></TETextarea>
                </div>
              </div>

              {/* <!-- Login button --> */}
              <div className="flex justify-center text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={registerCenter}
                  >
                    Registration
                  </button>
                </TERipple>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
