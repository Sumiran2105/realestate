export const getDashboardPath = (role) => {
  switch (role) {
    case 'agent':
      return '/dashboard/agent';
    case 'seller':
      return '/dashboard/seller';
    case 'builder':
      return '/dashboard/builder';
    case 'admin':
      return '/dashboard/admin';
    case 'buyer':
      return '/buyer/home';
    default:
      return '/';
  }
};

export const getPropertyManagerBasePath = (role) =>
  role === 'builder' ? '/dashboard/builder' : '/dashboard/seller';

export const getPropertyManagerLabel = (role) =>
  role === 'builder' ? 'Builder' : 'Seller';
