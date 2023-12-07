export default (data) => {
    let errors ={};
    if (data.forename.length > 12) {
        errors.forename1 = "Nombre demasiado largo!"
    } 
    if (data.forename.length < 2) {
        errors.forename2 = "Nombre demasiado corto!"
    } 
    if (!/^[a-zA-Z ]+$/.test(data.forename)) {
        errors.forename3 = "El nombre solo puede contener letras y espacios";
    }
    if (data.surname.length > 12) {
        errors.surname1 = "Apellido demasiado largo!"
    } 
    if (data.surname.length < 2) {
        errors.surname2 = "Apellido demasiado corto!"
    } 
    if (!/^[a-zA-Z ]+$/.test(data.surname)) {
        errors.surname3 = "El apellido solo puede contener letras y espacios";
    }
    if (data.nationality.length > 15) {
        errors.nationality1 = "Debe ingresar menos de 15 caracteres!"
    } 
    if (data.nationality.length < 2) {
        errors.nationality2 = "Debe ingresar mas de 2 caracteres!"
    } 
    if (!/^[a-zA-Z ]+$/.test(data.nationality)) {
        errors.nationality3 = "La nacionalidad solo puede contener letras y espacios";
    }
    if (!data.image.startsWith("http")) {
        errors.image1 = "La URL de la imagen debe comenzar con 'http'";
    } 
    
    const maxDate = new Date("2005-01-01");
    const inputDate = new Date(data.dob);
  
    if (inputDate >= maxDate) {
      errors.dob1 = "La fecha de nacimiento debe ser anterior a 2005";
    }
    if (data.description.length > 400) {
        errors.description1 = "Descripción demasiada larga"
    } 
    if (data.description.length < 15) {
        errors.description2 = "Descripción demasiada corta"
    }
    return errors;
}