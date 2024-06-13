import React from "react";
import { TEInput, TERipple } from "tw-elements-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginGoogle from "../AuthPage/LoginGoogle";
import { TETextarea } from "tw-elements-react";

const urlPlayerRegister = "http://localhost:3020/auth/player/register";

export default function PlayerRegistration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  //PATCH PER CARICARE AVATAR IN CLAUDINARY
  const uploadAvatarPlayer = async (file, playerId) => {
    try {
      const newImg = new FormData();

      newImg.append("avatar", file);

      console.log(playerId);
      console.log(`http://localhost:3020/player/${playerId}/avatar`);

      if (playerId) {
        const response = await fetch(
          `http://localhost:3020/player/${playerId}/avatar`,
          {
            method: "PATCH",
            // headers: {
            //   Authorization: `Bearer ${token}`,
            // },
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
        return;
      }
    } catch (error) {
      console.error(
        "Si è verificato un errore durante il caricamento dell'immagine su Cloudinary:",
        error
      );
    }
  };

  const registerPlayer = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(urlPlayerRegister, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          name,
          surname,
          email,
          bio,
        }),
      });

      if (response.ok) {
        console.log("Registrazione riuscita con successo");

        const data = await response.json();
        // console.log(data);
        // console.log(avatar);

        //NAVIGO ALLA HOMEPAGE DEI BLOG
        await uploadAvatarPlayer(avatar, data._id);
        navigate("/LoginPlayer");
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
    }
  };

  return (
    <>
      <section>
        <div>
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
            <div className="mb-12 md:mb-10 md:w-8/12 lg:m-10 lg:w-5/12 xl:w-5/12 flex justify-center">
              <form>
                {/* <!--Sign in section--> */}
                <div className="flex flex-row items-center justify-center lg:justify-start">
                  <p className="mb-0 mr-4 text-lg">Register as a player</p>
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

                {/* <!-- Surname input --> */}
                <TEInput
                  type="text"
                  label="Surname"
                  size="lg"
                  className="mb-6"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
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

                {/* <!-- Email input --> */}
                <TEInput
                  type="email"
                  label="Email address"
                  size="lg"
                  className="mb-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></TEInput>

                {/* <!-- Avatar--> */}
                <div className="mb-3 w-96">
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
                    onChange={(e) => setAvatar(e.target.files[0])}
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

                {/* <!-- Divider --> */}
                <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                    OR
                  </p>
                </div>
                <div className="mb-30 flex flex-col items-center gap-5">
                  {/* <!-- Social login buttons --> */}
                  <LoginGoogle />

                  {/* <!-- Login button --> */}
                  <div className="text-center lg:text-left">
                    <TERipple rippleColor="light">
                      <button
                        type="button"
                        className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                        onClick={registerPlayer}
                      >
                        Register
                      </button>
                    </TERipple>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
