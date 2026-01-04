import React, { useState } from 'react';
import { Upload, Camera, Search, Clock, Users, ChefHat, Plus, X } from 'lucide-react';

const RecipeFinder = () => {
  const [ingredients, setIngredients] = useState([]);
  const [inputText, setInputText] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('text');

  // Sample recipes for demonstration
  const sampleRecipes = [
    {
      id: 1,
      name: "Mediterranean Pasta",
      image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300&h=200&fit=crop",
      time: "25 mins",
      servings: 4,
      difficulty: "Easy",
      matchedIngredients: ["tomatoes", "pasta", "garlic"],
      description: "A fresh and flavorful pasta dish with Mediterranean herbs and vegetables."
    },
    {
      id: 2,
      name: "Vegetable Stir Fry",
      image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=200&fit=crop",
      time: "15 mins",
      servings: 2,
      difficulty: "Easy",
      matchedIngredients: ["onions", "bell peppers", "garlic"],
      description: "Quick and healthy stir fry with crisp vegetables and savory sauce."
    },
    {
      id: 3,
      name: "Chicken Curry",
      image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=300&h=200&fit=crop",
      time: "45 mins",
      servings: 6,
      difficulty: "Medium",
      matchedIngredients: ["chicken", "onions", "tomatoes"],
      description: "Rich and aromatic curry with tender chicken in spiced gravy."
    }
  ];

  const addIngredient = () => {
    if (inputText.trim() && !ingredients.includes(inputText.trim().toLowerCase())) {
      setIngredients([...ingredients, inputText.trim().toLowerCase()]);
      setInputText('');
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
    // Clear the file inputs
    const fileInput = document.getElementById('image-upload');
    const cameraInput = document.getElementById('camera-capture');
    if (fileInput) fileInput.value = '';
    if (cameraInput) cameraInput.value = '';
  };

  const findRecipes = async () => {
    setLoading(true);
    // Simulate API call to your Python backend
    setTimeout(() => {
      setRecipes(sampleRecipes);
      setLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addIngredient();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <ChefHat className="w-8 h-8 text-orange-500 mr-3" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
              Smart Recipe Finder
            </h1>
          </div>
          <p className="text-center text-gray-600 mt-2">
            Discover delicious recipes based on your available ingredients
          </p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-orange-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            What ingredients do you have?
          </h2>
          
          {/* Tab Navigation */}
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setActiveTab('text')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'text' 
                    ? 'bg-white shadow-md text-orange-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Search className="w-4 h-4 inline mr-2" />
                Type Ingredients
              </button>
              <button
                onClick={() => setActiveTab('image')}
                className={`px-6 py-2 rounded-md transition-all ${
                  activeTab === 'image' 
                    ? 'bg-white shadow-md text-orange-600' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Camera className="w-4 h-4 inline mr-2" />
                Upload Image
              </button>
            </div>
          </div>

          {/* Text Input Tab */}
          {activeTab === 'text' && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter an ingredient (e.g., tomatoes, chicken, rice)"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none"
                />
                <button
                  onClick={addIngredient}
                  className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              
              {/* Ingredients List */}
              {ingredients.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-700">Your Ingredients:</h3>
                  <div className="flex flex-wrap gap-2">
                    {ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {ingredient}
                        <button
                          onClick={() => removeIngredient(ingredient)}
                          className="ml-2 hover:text-green-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Image Upload Tab */}
          {activeTab === 'image' && (
            <div className="space-y-4">
              {!uploadedImage ? (
                <div className="space-y-4">
                  {/* Upload from Device */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-orange-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer block">
                      <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">
                        Upload from Device
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        PNG, JPG, or JPEG (MAX. 10MB)
                      </p>
                    </label>
                  </div>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">or</span>
                    </div>
                  </div>

                  {/* Camera Capture */}
                  <div className="border-2 border-dashed border-green-300 rounded-lg p-6 text-center hover:border-green-400 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleCameraCapture}
                      className="hidden"
                      id="camera-capture"
                    />
                    <label htmlFor="camera-capture" className="cursor-pointer block">
                      <Camera className="w-10 h-10 text-green-500 mx-auto mb-3" />
                      <p className="text-gray-600 font-medium">
                        Take Photo with Camera
                      </p>
                      <p className="text-sm text-gray-400 mt-1">
                        Capture ingredients directly
                      </p>
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    <img
                      src={uploadedImage}
                      alt="Uploaded ingredients"
                      className="max-w-full h-64 object-cover rounded-lg mx-auto border-2 border-orange-200"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-colors"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 mb-3">
                      Image uploaded! Click "Find Recipes" to analyze ingredients.
                    </p>
                    <button
                      onClick={removeImage}
                      className="text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
                    >
                      Choose different image
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Find Recipes Button */}
          <div className="text-center mt-6">
            <button
              onClick={findRecipes}
              disabled={loading || (activeTab === 'text' && ingredients.length === 0) || (activeTab === 'image' && !uploadedImage)}
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-green-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Finding Recipes...
                </span>
              ) : (
                'Find Recipes'
              )}
            </button>
          </div>
        </div>

        {/* Results Section */}
        {recipes.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Recommended Recipes ({recipes.length})
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {recipe.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {recipe.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {recipe.time}
                      </span>
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {recipe.servings} servings
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        Matched Ingredients:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.matchedIngredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full py-2 bg-gradient-to-r from-orange-500 to-green-500 text-white rounded-lg hover:shadow-md transition-all">
                      View Recipe
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeFinder;