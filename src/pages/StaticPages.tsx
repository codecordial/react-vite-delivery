import React from 'react';
import { Info, FileText } from 'lucide-react';

interface StaticPageProps {
  type: 'about' | 'terms';
}

const StaticPage: React.FC<StaticPageProps> = ({ type }) => {
  if (type === 'about') {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Info className="text-red-600" size={24} />
          <h1 className="text-2xl font-bold text-red-600">About Us</h1>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
          <p className="text-gray-800 leading-relaxed">
            HATIL traces its roots to H.A. Timber Industries Ltd, a company 
            established in 1963 by late Al-Haj Habibur Rahman. Following his 
            footsteps, HATIL, as a singular furniture brand, came into being 
            under the leadership of Selim H. Rahman, a veteran and visionary 
            leader in country's furniture industry.
          </p>
          
          <p className="text-gray-800 leading-relaxed">
            Founded in 1989 in Bangladesh, HATIL has grown from a modest local 
            brand into a globally recognized name in the furniture industry, 
            known for premium design, cutting-edge manufacturing, and 
            sustainable practices. Our products grace homes, offices, and 
            institutions in more than 18 countries, including the USA, Canada, 
            Australia, and the Middle East.
          </p>
          
          <p className="text-gray-800 leading-relaxed">
            Each HATIL creation is a reflection of contemporary design, 
            functional beauty, and timeless comfort. Whether it's a sleek office 
            desk, a cozy recliner, or a complete modular kitchen, we blend 
            global trends with local craftsmanship to deliver pieces that feel 
            personal yet universal.
          </p>
          
          <p className="text-gray-800 leading-relaxed">
            From sourcing eco-friendly materials to deploying state-of-the-art 
            German and Italian machinery, HATIL adheres to the highest standards 
            of production. Our in-house quality assurance ensures that every 
            product not only looks great but lasts long—designed to be part of 
            your memories for years to come.
          </p>
          
          <p className="text-gray-800 leading-relaxed">
            Innovation is at the heart of HATIL. We were the first in 
            Bangladesh to introduce online furniture shopping, augmented reality 
            showrooms, and automated manufacturing lines. With more than 70 
            showrooms nationwide and a growing global presence, we make modern 
            living accessible, stylish, and convenient.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <FileText className="text-red-600" size={24} />
        <h1 className="text-2xl font-bold text-red-600">Terms & Conditions</h1>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h3>
          <p className="text-gray-800 leading-relaxed">
            By using HATIL's services, you agree to comply with these Terms and 
            Conditions. If you do not agree, please refrain from using our services.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">2. Delivery and Fitting</h3>
          <p className="text-gray-800 leading-relaxed">
            We aim to deliver and install your furniture within the specified 
            time frame. However, delays may occur due to unforeseen 
            circumstances such as weather conditions or traffic. HATIL is not 
            liable for delays beyond our control.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">3. Payment</h3>
          <p className="text-gray-800 leading-relaxed">
            All payments must be made at the time of order placement. We accept 
            payments via cash, credit/debit cards, and mobile banking. Refunds 
            are processed within 7-10 business days if applicable.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">4. Cancellations</h3>
          <p className="text-gray-800 leading-relaxed">
            Orders can be canceled within 24 hours of placement without any 
            charge. Cancellations after this period may incur a 10% cancellation fee.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">5. Liability</h3>
          <p className="text-gray-800 leading-relaxed">
            HATIL is not responsible for damages to furniture caused by improper 
            handling after delivery or installation. Please inspect all items 
            upon receipt and report any issues within 48 hours.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">6. Contact Us</h3>
          <p className="text-gray-800 leading-relaxed">
            For any questions regarding these Terms and Conditions, please reach 
            out to us at legal@hatil.com.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StaticPage;