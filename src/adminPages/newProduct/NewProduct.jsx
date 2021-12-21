import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import { addProduct } from "../../adminRedux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function NewProduct() {

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]:e.target.value}
    })
  }

  const handleCategories = (e) => {
    setCategories(e.target.value.split(","))
  }

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default: 
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {...inputs, image:downloadURL, categories:categories};
          addProduct(product, dispatch);
          history.push("/products");
        });
      }
    );
  }

  // console.log("inputs: ", inputs);
  // console.log("file: ", file);
  // console.log("categories: ", categories);


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input name="image" type="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="product title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input name="description" type="text" placeholder="product description" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Material</label>
          <input name="material" type="text" placeholder="product material" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input name="color" type="text" placeholder="product color" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="product price"  onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input name="categories" type="text" placeholder="pot, vase, indian decorative" onChange={handleCategories} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" id="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
