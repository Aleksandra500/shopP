import { useEffect, useState} from "react"
import { getAllProduct } from "../services/getAllProductsService";
import { useDispatch, useSelector } from "react-redux";
import { showLoaderAction } from "../store/loaderSlice";
import LoaderComponent from "../components/Loader";
import { saveAllProductsAction } from "../store/productSlice";
import CardComponent from "../components/CardComponent";
import { MdGridView } from 'react-icons/md';
import { TiThListOutline } from 'react-icons/ti';


function AllProduct() {
   const [isGrid, setIsGrid] = useState('gridView');
   const dispatch = useDispatch()
   const { allProducts } = useSelector((state) => state.productStore);
    useEffect(() => {
      const fetchProduct = async () => {
          dispatch(showLoaderAction(true));
          const res = await getAllProduct();
          dispatch(showLoaderAction(false));
        
          
          if (res.status === 'success') {
              dispatch(saveAllProductsAction(res.products))
          }
         
      };
      fetchProduct();
  }, [dispatch]);

  return (
 

<div className="  bg-gradient-to-r from-teal-400 via-blue-500 to-indigo-600 ">
  <div className="container mx-auto">
  {<LoaderComponent/>}
  <div className='flex items-center py-[20px] gap-[20px] justify-end'>
    <TiThListOutline
      size={28}
      onClick={() => setIsGrid('listView')}
      className={
        isGrid === 'listView'
          ? 'bg-mainYellow p-[2px] rounded-lg'
          : ''
      }
    />
    <MdGridView
      size={28}
      onClick={() => setIsGrid('gridView')}
      className={
        isGrid === 'gridView'
          ? 'bg-mainYellow p-[2px] rounded-lg'
          : ''
      }
    />
  </div>
  { dispatch(showLoaderAction(false))? (
    <div
      className={
        isGrid === 'gridView'
          ? 'flex flex-wrap justify-center items-center gap-[10px]'
          : 'flex flex-col items-center justify-center gap-[10px]'
      }>
      {allProducts.map((product) => {
        return (
          <CardComponent
            key={product.id}
            product={product}
            isGrid={isGrid}
            setIsGrid={setIsGrid}
          />
        );
      })}
    </div>
  ) : (
    <div>dispatch(showLoaderAction(true))</div>
  )}
  {/* {!selectCategory && (
    <div className='flex items-centar justify-center py-[50px]'>
      <button
        className='bg-mainBlue text-textWhite rounded-lg px-[16px] py-[8px] my-[20px] hover:bg-mainYellow transition-all duration-300'
        onClick={() => setLimitProducts(limitProducts + 10)}>
        View more Products..
      </button>
    </div>
  )} */}


  </div>
  
</div>


)
}

export default AllProduct