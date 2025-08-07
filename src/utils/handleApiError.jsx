const handleApiError = (error) => {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 400:
        return "Solicitud inválida";
      case 401:
        return "No autorizado";
      case 500:
        return "Error del servidor";
      default:
        return `Error inesperado: ${status}`;
    }
  } else if (error.request) {
    return "No se pudo conectar al servidor";
  } else {
    console.log("Error desconocido");
    return JSON.stringify(error);
  }
};

export default handleApiError;
