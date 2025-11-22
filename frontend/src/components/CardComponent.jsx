import { NavLink } from 'react-router-dom';
import { Rating } from '@mui/material';

// ovo su parametri
// { product, isGrid }

function CardComponent({ product, isGrid }) {
  return (
    <div
      className={
        isGrid === 'gridView'
          ? 'w-[300px] h-[480px] border border-[#B6B6B6] rounded-[10px] flex flex-col items-center justify-between mt-[30px] bg-white shadow-lg p-4'
          : 'w-full flex items-center border border-gray-100 justify-between rounded-lg gap-[3px] bg-white shadow-lg p-4'
      }
    >
      <img
        src={`https://aleksandrashop.alwaysdata.net/uploads/${product.image}`}
        alt=''
        className={
          isGrid === 'gridView'
            ? 'w-full h-[200px] object-cover rounded-t-[10px]'
            : 'sm:w-[70px]  lg:w-[150px] h-[150px] object-cover rounded-t-[10px]'
        }
      />
      <div className="flex flex-col justify-between h-full w-full mt-[15px]">
        <div>
          <h3
            className={
              isGrid === 'listView'
                ? 'text-[14px] md:text-[16px] font-semibold'
                : 'text-lg font-semibold'
            }
          >
            {product.title}
          </h3>
          <h4
            className={
              isGrid === 'listView'
                ? 'text-[14px] md:text-[16px] font-bold'
                : 'text-xl font-bold'
            }
          >
            ${product.price}
          </h4>
        </div>
        <div className={isGrid === 'listView' ? 'hidden lg:flex' : 'mt-[10px]'}>
          <Rating name='read-only' value={product.rating} readOnly />
        </div>
        <NavLink
          to={`/singleProduct/${product.id}`}
          className={
            isGrid === 'gridView'
              ? 'bg-mainBlue text-textWhite rounded-lg px-[16px] py-[8px] mt-[auto] hover:bg-mainYellow transition-all duration-300'
              : 'bg-mainBlue text-textWhite rounded-lg px-[8px] py-[2px] lg:px-[10px] lg:py-[5px] mt-[auto] hover:bg-mainYellow transition-all duration-300'
          }
        >
          View more
        </NavLink>
      </div>
    </div>
  );
}

export default CardComponent;
