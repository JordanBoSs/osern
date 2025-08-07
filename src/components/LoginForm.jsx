import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Loader from "./Loader";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const schemeSignIn = yup.object({
  email: yup
    .string()
    .matches(emailRegex, "Correo inválido")
    .required("Correo requerido"),
  password: yup.string().required("Contraseña requerida"),
});

const LoginForm = (props) => {
  const { isLoading, signIn } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemeSignIn),
  });

  const onSubmit = (data) => {
    signIn(data);
  };
  return (
    <>
      <form className="login-form-container" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-title">Iniciar sesión</h2>
        <p className="text-subtitle">Acceso de usuarios</p>
        <div className="input-container">
          <label>Correo electrónico</label>
          <input
            type="email"
            {...register("email")}
            placeholder="email@email.com"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>
        <div className="input-container">
          <label>Contraseña</label>
          <input
            type="password"
            {...register("password")}
            placeholder="Contraseña"
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>
        {isLoading ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : (
          <>
            <button className="button-login" type="submit">
              Iniciar sesión
            </button>
          </>
        )}
      </form>
      <style jsx>
        {`
          .login-form-container {
            max-width: 300px;
            display: flex;
            flex-direction: column;
            align-items: center;
            background-color: rgb(238, 238, 238);
            color: #000;
            padding: 50px;
            border-radius: 14px;
            opacity: 0;
            animation: fadeIn 1s ease-out forwards;
          }
          .text-title {
            font-size: clamp(1.1rem, 2.5vw, 2rem);
            margin: 5px;
          }
          .text-subtitle {
            font-size: clamp(0.9rem, 1.8vw, 1.2rem);
            margin: 5px 0px 50px 0px;
          }
          .input-container {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin: 10px 0px;
          }
          .input-container label {
            font-size: 16px;
          }
          .input-container input {
            font-size: 16px;
            width: 250px;
            height: 35px;
            border: none;
            border-radius: 9px;
            background-color: #ffffff;
            outline: none;
            color: rgb(62, 62, 62);
            padding: 0px 5px;
          }
          .loader-container {
            height: 40px;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10px 0px;
          }
          .button-login {
            height: 40px;
            width: 100%;
            margin: 10px 0px;
            background-color: rgb(40, 40, 40);
            transition: background-color 0.3s ease;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 9px;
            color: white;
            font-weight: 600;
            cursor: pointer;
          }
          .button-login:hover {
            border: none;
            background-color: rgb(105, 104, 104);
          }
          .error-text {
            font-size: 0.8em;
            color: red;
            font-weight: 600;
            margin: 0px;
          }
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0px);
            }
          }
          @media (max-width: 768px) {
            .login-form-container {
              padding: 20px;
            }
            .text-subtitle {
              margin-bottom: 20px;
            }
          }
        `}
      </style>
    </>
  );
};

export default LoginForm;
