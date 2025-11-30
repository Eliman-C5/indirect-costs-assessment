import { CheckSquare, Printer, Package, MoreHorizontal } from 'lucide-react';

interface OperationIconProps {
  type: string;
}

export default function OperationIcon({ type }: OperationIconProps) {
  const iconProps = {
    className: 'w-5 h-5 text-muted-foreground',
    strokeWidth: 1.5,
  };

  switch (type) {
    case 'print':
      return <Printer {...iconProps} className="w-5 h-5 text-purple-500" />;
    case 'laminate':
      return <CheckSquare {...iconProps} className="w-5 h-5 text-red-500" />;
    case 'package':
      return <Package {...iconProps} className="w-5 h-5 text-orange-500" />;
    default:
      return <MoreHorizontal {...iconProps} className="w-5 h-5 text-gray-400" />;
  }
}
