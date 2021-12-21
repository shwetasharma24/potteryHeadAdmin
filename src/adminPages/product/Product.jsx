import { useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../adminComponents/chart/Chart";
import { Publish } from "@material-ui/icons";
import {useSelector} from "react-redux";
import { useEffect, useMemo, useState } from "react";
import  {userRequest}  from "../../axios/requestMethods";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../../firebase';
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {updateProduct} from "../../adminRedux/apiCalls";

export default function Product() {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [productStats, setProductStats] = useState([]);
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const [product, setProduct] = useState(useSelector(state => state.product.products.find(product => product._id === productId)))

    const MONTHS = useMemo(() => [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ], []);


    useEffect(() => {
          const getStats = async () => {
              try{
                const res = await userRequest.get("orders/income?pid=" + productId);
                res.data.map(item => setProductStats((prev) => [
                    ...prev,
                    {
                        name:MONTHS[item._id - 1],
                        Sales: item.total
                    },
                ]))
              }
              catch(err){
                  console.log(err);
              }
        }
        getStats();
    }, []);



    const handleChange = (e) => {

        setProduct(prev => {
          return {...prev, [e.target.name]:e.target.value}
        })
    }


    const handleUpdateClick = (e) => {
        e.preventDefault();

        if(file!==null){
            const fileName = new Date().getTime() + file.name;
            const storage = getStorage(app);
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed', 
                (snapshot) => {
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
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setProduct(prev => (
                            {...prev, image:downloadURL}
                        ));
                        updateProduct(productId, product, dispatch);
                        history.push("/products");
                    });
                }
            );
        }
        else{
            updateProduct(productId, product, dispatch);
            history.push("/products");   
        }
    }


  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={productStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.image} alt="" className="productInfoImg" />
                  <span className="productName"> {product.title} </span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">Id: </span>
                      <span className="productInfoValue"> {product._id} </span>
                  </div>

                  <div className="productInfoItem">
                      <span className="productInfoKey">In Stock:</span>
                      <span className="productInfoValue"> {product.inStock ? "yes" : "no"} </span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <div className="productForm">
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <input type="text" name="title" value={product.title} onChange={handleChange} />
                  <label>Product Description</label>
                  <textarea name="description" value={product.description} onChange={handleChange} />
                  <label>In Stock</label>
                  <select name="inStock" id="idStock" onChange={handleChange}>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
                  <label>Price in ₹</label>
                  <input type="text" name="price" value={product.price} onChange={handleChange}/>
                  <label>Color</label>
                  <input type="text" name="color" value={product.color} onChange={handleChange} />
                  <label>Material</label>
                  <input type="text" name="material" value={product.material} onChange={handleChange} />
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.image} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish style={{cursor: "pointer"}} />
                      </label>
                      <input type="file" name="image" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])} />
                  </div>
                  <button className="productButton" onClick={handleUpdateClick} >Update</button>
              </div>
          </div>
      </div>
    </div>
  );
}
