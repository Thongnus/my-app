import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Breadcrumb: React.FC = () => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    const breadcrumbItems = [
        { path: '/', label: 'Trang Chủ' },
        ...pathnames.map((value, index) => {
            const path = `/${pathnames.slice(0, index + 1).join('/')}`;
            const label = value.charAt(0).toUpperCase() + value.slice(1);
            return { path, label };
        }),
    ];

    return (
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
            <ol className="flex space-x-2">
                {breadcrumbItems.map((item, index) => (
                    <li key={item.path} className="flex items-center">
                        {index < breadcrumbItems.length - 1 ? (
                            <>
                                <Link to={item.path} className="text-gray-500 hover:underline">
                                    {item.label}
                                </Link>
                                <span className="mx-2 text-gray-500">/</span>
                            </>
                        ) : (
                            <span className="text-gray-700">{item.label}</span>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;