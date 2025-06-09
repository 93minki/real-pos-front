export type MenuItemType = {
  id: number;
  category: string | null;
  createdAt: string;
  description: string | null;
  is_active: 1 | 0;
  name: string;
  price: number;
  updatedAt: string;
};

export type MenuListResponseType = {
  success: boolean;
  error?: string;
  data: MenuItemType[];
};

export type CreateMenuRequestType = {
  name: string;
  price: number;
  description: string;
  category: string;
  is_active: boolean;
};

export type CreateMenuResponseType = {
  success: boolean;
  error?: string;
  data: {
    name: string;
    price: number;
    category: string;
    description: string;
    is_active: 1 | 0;
    user: {
      id: string;
      email: string;
    };
    id: string;
    created_at: string;
    updated_at: string;
  };
};

export type UpdateMenuRequestType = {
  name: string;
  price: number;
  description: string;
  category: string;
  is_active: boolean;
};

export type UpdateMenuResponseType = {
  success: boolean;
  error?: string;
  data: {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
};
