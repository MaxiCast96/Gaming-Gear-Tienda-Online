import { Schema, model } from "mongoose";

// Modelo para Reseñas
const reviewSchema = new Schema(
    {
      productoId: {
        type: Schema.Types.ObjectId,
        required: [true, "El ID del producto es obligatorio"],
        index: true, // Añadir índice para búsquedas más rápidas
        description: "ID del producto que será reseñado"
      },
      usuario: {
        type: String,
        required: [true, "El nombre del usuario es obligatorio"],
        trim: true,
        minlength: [2, "El nombre debe tener al menos 2 caracteres"],
        maxlength: [100, "El nombre no puede exceder 100 caracteres"],
        description: "Nombre del usuario que hace la reseña"
      },
      estrellas: {
        type: Number,
        required: [true, "La calificación es obligatoria"],
        min: [1, "La calificación mínima es 1 estrella"],
        max: [5, "La calificación máxima es 5 estrellas"],
        validate: {
          validator: Number.isInteger,
          message: "La calificación debe ser un número entero"
        },
        description: "Calificación en estrellas (1-5)"
      },
      comentario: {
        type: String,
        required: [true, "El comentario es obligatorio"],
        trim: true,
        minlength: [10, "El comentario debe tener al menos 10 caracteres"],
        maxlength: [500, "El comentario no puede exceder 500 caracteres"],
        description: "Comentario del usuario sobre el producto"
      },
      verificado: {
        type: Boolean,
        default: false,
        description: "Si la reseña ha sido verificada"
      },
      reportado: {
        type: Boolean,
        default: false,
        description: "Si la reseña ha sido reportada"
      },
      util: {
        type: Number,
        default: 0,
        description: "Número de personas que encontraron útil la reseña"
      }
    },
    { 
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    }
);

// Índices para optimizar búsquedas
reviewSchema.index({ productoId: 1, createdAt: -1 });
reviewSchema.index({ estrellas: 1 });
reviewSchema.index({ verificado: 1 });
reviewSchema.index({ createdAt: -1 });

// Virtual para formatear la fecha
reviewSchema.virtual('fechaFormateada').get(function() {
  if (!this.createdAt) return '';
  return this.createdAt.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
});

// Virtual para calcular días desde la creación
reviewSchema.virtual('diasDesdeCreacion').get(function() {
  if (!this.createdAt) return 0;
  const now = new Date();
  const diff = now - this.createdAt;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
});

// Método estático para obtener estadísticas de un producto
reviewSchema.statics.getEstadisticasProducto = async function(productoId) {
  const stats = await this.aggregate([
    { $match: { productoId: productoId } },
    {
      $group: {
        _id: null,
        totalResenas: { $sum: 1 },
        promedioEstrellas: { $avg: "$estrellas" },
        distribuciones: { $push: "$estrellas" }
      }
    }
  ]);
  
  if (stats.length === 0) {
    return {
      totalResenas: 0,
      promedioEstrellas: 0,
      distribucion: []
    };
  }
  
  const result = stats[0];
  const distribucion = [1, 2, 3, 4, 5].map(estrella => {
    const cantidad = result.distribuciones.filter(e => e === estrella).length;
    const porcentaje = result.totalResenas > 0 ? 
      Math.round((cantidad / result.totalResenas) * 100) : 0;
    return { estrellas: estrella, cantidad, porcentaje };
  }).reverse();
  
  return {
    totalResenas: result.totalResenas,
    promedioEstrellas: Math.round(result.promedioEstrellas * 10) / 10,
    distribucion
  };
};

// Middleware pre-save para validaciones adicionales
reviewSchema.pre('save', function(next) {
  // Limpiar espacios en blanco
  if (this.usuario) this.usuario = this.usuario.trim();
  if (this.comentario) this.comentario = this.comentario.trim();
  
  next();
});

// Middleware post-save para logging
reviewSchema.post('save', function(doc) {
  console.log(`Nueva reseña creada para producto ${doc.productoId}: ${doc.estrellas} estrellas`);
});

export default model("Resena", reviewSchema);