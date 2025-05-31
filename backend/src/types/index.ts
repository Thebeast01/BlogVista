export interface AuthenticatedRequest extends Request {
  id: string;
  user?: {
    id: string;
    email: string;
    name?: string;
  };
}

