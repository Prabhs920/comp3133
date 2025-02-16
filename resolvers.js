const Movie = require('./models/Movie'); // Import Mongoose Model

const resolvers = {
  Query: {
    movies: async () => await Movie.find(),
    movie: async (_, { id }) => await Movie.findById(id),
  },
  Mutation: {
    addMovie: async (_, { name, director_name, production_house, release_date, rating }) => {
        if (!name || !director_name || !production_house || !release_date || rating == null) {
          throw new Error("All fields are required.");
        }
      
        const newMovie = new Movie({ name, director_name, production_house, release_date, rating });
      
        try {
          const savedMovie = await newMovie.save();
          console.log("✅ Movie saved:", savedMovie);
          return savedMovie;
        } catch (error) {
          console.error("❌ Error saving movie:", error);
          throw new Error("Error saving movie.");
        }
      },
    updateMovie: async (_, { id, name, director_name, production_house, release_date, rating }) => {
      return await Movie.findByIdAndUpdate(id, 
        { name, director_name, production_house, release_date, rating }, 
        { new: true }
      );
    },
    deleteMovie: async (_, { id }) => {
      await Movie.findByIdAndDelete(id);
      return "Movie deleted successfully";
    },
  },
};

module.exports = resolvers;
