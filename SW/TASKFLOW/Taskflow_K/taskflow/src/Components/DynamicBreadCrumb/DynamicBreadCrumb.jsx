import Breadcrumb from 'antd/es/breadcrumb';
import 'antd/es/breadcrumb/style';
import { useLocation, Link } from 'react-router-dom';
import { useTheme } from '../../Context/DarkModeProvider';

function DynamicBreadcrumb() {
  const location = useLocation();
  const { isDarkMode } = useTheme();
  
  const pathnames = location.pathname.split('/').filter((x) => x);
  
  const items = [
    { title: <Link to="/">Home</Link> },
    ...pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      
      return {
        title: isLast ? (
          name.charAt(0).toUpperCase() + name.slice(1) 
        ) : (
          <Link to={routeTo}>{name}</Link>
        ),
      };
    }),
  ];
  
  return (
    <Breadcrumb 
      items={items} 
      style={{ 
        margin: "16px 0",
        background: isDarkMode ? "black" : "white"
      }} 
    />
  );
}

export default DynamicBreadcrumb;