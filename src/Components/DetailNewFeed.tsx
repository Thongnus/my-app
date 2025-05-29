import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { NewfeedDto } from '../Entity/Entity';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import Breadcrumb from './BreadCrumb';

const DetailNewFeed: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const promo = location.state?.promo as NewfeedDto | undefined;

  if (!promo || promo.id !== Number(id)) {
    return <div className="container mx-auto px-4 py-12 text-center text-red-500">Không tìm thấy khuyến mãi</div>;
  }

  const formattedDate = promo.createdAt
    ? new Date(promo.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : '';

  const shareUrl = `https://www.easybook.com/vi-vn/deals/vietnam/nghi-le-30-4-${promo.id}`;
  const shareTitle = promo.title;

  return (
    
    <div className="article outer clearfix container mx-auto px-4 py-12">
         <Breadcrumb />
      <div className="col-sm-12">
       
        <img
          className="main w-full h-96 object-cover rounded-lg mb-4"
          src={promo.image}
          alt={promo.title}
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.src = '/images/default.jpg';
          }}
        />
        <h1 className="text-3xl font-bold mb-2 text-yellow-600">{promo.title}</h1>
        <p className="date text-gray-500 mb-4">{formattedDate}</p>
        <div className="content" dangerouslySetInnerHTML={{ __html: promo.content || '' }} />
        <input type="hidden" id="Id" name="Id" value={promo.id} />
        <div className="flex space-x-4 mt-6">
          <a
            href="https://www.easybook.com/vi-vn/vi-vn"
            className="btn btn-lg btn-orange inline-block bg-orange-500 text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Đặt Mua Ngay
          </a>
          <FacebookShareButton url={shareUrl} >
            <FacebookIcon size={48} round />
          </FacebookShareButton>
        </div>
      </div>
    </div>
  );
};

export default DetailNewFeed;