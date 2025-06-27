const reviewsController = {};
import Resena from "../models/Reviews.js";
import mongoose from "mongoose";

// Obtener todas las reseñas de un producto específico
reviewsController.getResenasByProducto = async (req, res) => {
  try {
    const { productoId } = req.params;
    
    // Validar que el productoId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
      return res.status(400).json({ message: "ID de producto inválido" });
    }

    const resenas = await Resena.find({ productoId: productoId })
      .sort({ createdAt: -1 })
      .lean(); // Usar lean() para mejor performance
    
    res.json(resenas);
  } catch (error) {
    console.error('Error al obtener reseñas:', error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener estadísticas de reseñas para un producto
reviewsController.getEstadisticasProducto = async (req, res) => {
  try {
    const { productoId } = req.params;
    
    // Validar que el productoId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
      return res.status(400).json({ message: "ID de producto inválido" });
    }

    // Convertir a ObjectId para la agregación
    const productObjectId = new mongoose.Types.ObjectId(productoId);
    
    const estadisticas = await Resena.aggregate([
      { 
        $match: { 
          productoId: productObjectId 
        } 
      },
      {
        $group: {
          _id: null,
          totalResenas: { $sum: 1 },
          promedioEstrellas: { $avg: "$estrellas" },
          distribuciones: {
            $push: "$estrellas"
          }
        }
      }
    ]);

    if (estadisticas.length === 0) {
      return res.json({
        totalResenas: 0,
        promedioEstrellas: 0,
        distribucion: []
      });
    }

    const stats = estadisticas[0];
    
    // Calcular distribución de estrellas
    const distribucion = [1, 2, 3, 4, 5].map(estrella => {
      const cantidad = stats.distribuciones.filter(e => e === estrella).length;
      const porcentaje = stats.totalResenas > 0 ? Math.round((cantidad / stats.totalResenas) * 100) : 0;
      return {
        estrellas: estrella,
        cantidad,
        porcentaje
      };
    }).reverse(); // 5 estrellas primero

    res.json({
      totalResenas: stats.totalResenas,
      promedioEstrellas: Math.round(stats.promedioEstrellas * 10) / 10,
      distribucion
    });
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ message: error.message });
  }
};

// Crear nueva reseña
reviewsController.createResena = async (req, res) => {
  try {
    const { productoId, usuario, estrellas, comentario } = req.body;
    
    // Validaciones
    if (!productoId || !usuario || !estrellas || !comentario) {
      return res.status(400).json({ 
        message: "Todos los campos son obligatorios" 
      });
    }
    
    // Validar que el productoId sea un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(productoId)) {
      return res.status(400).json({ message: "ID de producto inválido" });
    }
    
    if (estrellas < 1 || estrellas > 5) {
      return res.status(400).json({ 
        message: "Las estrellas deben estar entre 1 y 5" 
      });
    }

    if (comentario.length > 500) {
      return res.status(400).json({ 
        message: "El comentario no puede exceder 500 caracteres" 
      });
    }

    const nuevaResena = new Resena({ 
      productoId: new mongoose.Types.ObjectId(productoId), 
      usuario: usuario.trim(), 
      estrellas: Number(estrellas), 
      comentario: comentario.trim() 
    });
    
    await nuevaResena.save();
    
    res.status(201).json({ 
      message: "Reseña guardada exitosamente",
      resena: nuevaResena
    });
  } catch (error) {
    console.error('Error al crear reseña:', error);
    res.status(500).json({ message: error.message });
  }
};

// Obtener todas las reseñas (para admin)
reviewsController.getAllResenas = async (req, res) => {
  try {
    const resenas = await Resena.find()
      .sort({ createdAt: -1 })
      .lean();
    res.json(resenas);
  } catch (error) {
    console.error('Error al obtener todas las reseñas:', error);
    res.status(500).json({ message: error.message });
  }
};

// Eliminar reseña
reviewsController.deleteResena = async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de reseña inválido" });
    }

    const resenaEliminada = await Resena.findByIdAndDelete(id);
    if (!resenaEliminada) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    res.json({ message: "Reseña eliminada" });
  } catch (error) {
    console.error('Error al eliminar reseña:', error);
    res.status(500).json({ message: error.message });
  }
};

// Actualizar reseña
reviewsController.updateResena = async (req, res) => {
  try {
    const { id } = req.params;
    const { usuario, estrellas, comentario } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de reseña inválido" });
    }
    
    if (estrellas && (estrellas < 1 || estrellas > 5)) {
      return res.status(400).json({ 
        message: "Las estrellas deben estar entre 1 y 5" 
      });
    }

    const updateData = {};
    if (usuario) updateData.usuario = usuario.trim();
    if (estrellas) updateData.estrellas = Number(estrellas);
    if (comentario) updateData.comentario = comentario.trim();

    const resenaActualizada = await Resena.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    );
    
    if (!resenaActualizada) {
      return res.status(404).json({ message: "Reseña no encontrada" });
    }
    
    res.json({ 
      message: "Reseña actualizada",
      resena: resenaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar reseña:', error);
    res.status(500).json({ message: error.message });
  }
};

export default reviewsController;