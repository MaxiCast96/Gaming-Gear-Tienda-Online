import { Schema, model } from "mongoose";

// Modelo para Empleados
const employeeSchema = new Schema(
    {
      nombre: {
        type: String,
        required: true,
        description: "Nombre del empleado",
      },
      rol: {
        type: String,
        description: "Cargo del empleado",
      },
      edad: {
        type: Number,
        required: true,
        description: "Edad del empleado",
      },
      dui: {
        type: String,
        required: true,
        description: "Número de identidad del empleado",
      },
      correoElectronico: {
        type: String,
        description: "Correo del empleado",
      },
      telefono: {
        type: Number,
        description: "Teléfono del empleado",
      },
    },
    { timestamps: true }
  );
  
  export default model("Employees", employeeSchema);