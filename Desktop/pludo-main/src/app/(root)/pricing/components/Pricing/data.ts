export interface Plan {
    name: string;
    price: string;
    features: string[];
    description: string;
    highlight?: boolean;
    buttonText: string;
    buttonVariant?: 'gradient' | 'outlined';
  }
  
  export const pricingPlans: Plan[] = [
    {
      name: 'Basic',
      price: '$20 /month',
      features: [
        'Only Bots Access',
        'Basic Customization',
        'Email Support',
        '100k API calls/month',
        'Basic Analytics',
      ],
      description: 'Perfect for getting started with bots',
      buttonText: 'Get Started',
      buttonVariant: 'outlined',
    },
    {
      name: 'Plus',
      price: '$149 /month',
      features: [
        'Advanced Customization',
        'Priority Support',
        '500k API calls/month',
        'Advanced Analytics',
        'Custom Integrations',
        'Team Collaboration',
      ],
      description: 'Perfect for growing teams',
      highlight: true,
      buttonText: 'Get Started',
      buttonVariant: 'gradient',
    },
    {
      name: 'Premium',
      price: 'Custom',
      features: [
        'Everything in Plus',
        'Unlimited API calls',
        'Custom Reporting',
        'SLA guarantee',
        'On-premise deployment',
        '24/7 dedicated support',
        'Custom Integration Pipeline',
      ],
      description: 'Perfect for large organizations',
      buttonText: 'Contact Sales',
      buttonVariant: 'outlined',
    },
  ];
  