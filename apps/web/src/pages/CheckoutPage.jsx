
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from 'sonner';
import { useLanguage } from '../hooks/useLanguage';

const DELIVERY_OPTIONS = [
  { 
    id: 'pickup', 
    label: 'Pickup', 
    price: 0, 
    description: 'Pick up your order directly from our restaurant.' 
  },
  { 
    id: 'nearest', 
    label: 'Nearest region: Saburtalo, Vake', 
    price: 5, 
    description: 'Standard delivery to nearby central areas.' 
  },
  { 
    id: 'outlying', 
    label: 'Outlying areas / შორი რაიონები', 
    price: 10, 
    description: 'Delivery to further districts within the city.' 
  },
  { 
    id: 'suburbs', 
    label: 'Delivery to suburbs of Tbilisi', 
    price: 0, 
    isTaxi: true, 
    description: 'Delivery fee will be calculated based on current taxi rates.' 
  }
];

function CheckoutPage() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deliveryDate: '',
    deliveryTime: '',
    chopstickSets: 0,
    address: '',
    instructions: ''
  });

  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const selectedDelivery = DELIVERY_OPTIONS.find(opt => opt.id === deliveryMethod);
  const deliveryFee = selectedDelivery ? selectedDelivery.price : 0;
  const total = subtotal + deliveryFee;

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'number' ? (parseInt(value, 10) || 0) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || (deliveryMethod !== 'pickup' && !formData.address)) {
      toast.error('Please fill in all required fields');
      return;
    }

    const order = {
      id: Date.now(),
      items: cartItems,
      customer: formData,
      delivery: {
        method: deliveryMethod,
        fee: deliveryFee,
        isTaxi: selectedDelivery?.isTaxi
      },
      subtotal,
      total,
      timestamp: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    localStorage.removeItem('cart');

    setOrderPlaced(true);
  };

  const handleContinueShopping = () => {
    navigate('/');
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Helmet>
          <title>Order Confirmed - Sushi Delivery</title>
          <meta name="description" content="Your order has been confirmed and is being prepared" />
        </Helmet>
        
        <div className="max-w-md w-full text-center">
          <div className="bg-card rounded-2xl p-8 border border-border shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed</h1>
            <p className="text-muted-foreground mb-6">
              Your order has been received and is being prepared
            </p>
            <div className="bg-muted rounded-xl p-4 mb-6">
              <p className="text-sm text-muted-foreground mb-1">Estimated time</p>
              <p className="text-2xl font-bold text-primary">
                {formData.deliveryTime ? formData.deliveryTime : (deliveryMethod === 'pickup' ? '20–30 minutes' : '55–85 minutes')}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.deliveryDate ? `Scheduled for ${formData.deliveryDate}` : (deliveryMethod === 'pickup' 
                  ? '(Preparation time)' 
                  : '(40 min preparation + 15–45 min delivery)')}
              </p>
            </div>
            <Button
              onClick={handleContinueShopping}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-98"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Checkout - Sushi Delivery</title>
        <meta name="description" content="Complete your order and get fresh sushi delivered to your door" />
      </Helmet>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-8 transition-all duration-200 hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Menu
        </Button>

        <h1 className="text-3xl md:text-4xl font-bold mb-8" style={{letterSpacing: '-0.02em'}}>
          Checkout
        </h1>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-7">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-8">
                
                {/* Contact Details Section (Top) */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-2">Contact Details</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-input text-foreground placeholder:text-muted-foreground"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="bg-input text-foreground placeholder:text-muted-foreground"
                        placeholder="+995 XXX XXX XXX"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryDate">Preferred Delivery Date</Label>
                      <Input
                        id="deliveryDate"
                        name="deliveryDate"
                        type="date"
                        value={formData.deliveryDate}
                        onChange={handleInputChange}
                        className="bg-input text-foreground"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deliveryTime">Preferred Delivery Time</Label>
                      <Input
                        id="deliveryTime"
                        name="deliveryTime"
                        type="time"
                        lang="en-GB"
                        value={formData.deliveryTime}
                        onChange={handleInputChange}
                        className="bg-input text-foreground block w-full appearance-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="chopstickSets">Number of Chopstick Sets</Label>
                    <Input
                      id="chopstickSets"
                      name="chopstickSets"
                      type="number"
                      min="0"
                      value={formData.chopstickSets}
                      onChange={handleInputChange}
                      className="bg-input text-foreground sm:max-w-[200px]"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Delivery Information Section (Bottom) */}
                <div className="space-y-4 pt-6 border-t border-border">
                  <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
                  
                  <div className="space-y-4 mb-6">
                    <Label className="text-base font-medium text-muted-foreground">Select Delivery Method</Label>
                    <RadioGroup 
                      value={deliveryMethod} 
                      onValueChange={setDeliveryMethod}
                      className="grid gap-3"
                    >
                      {DELIVERY_OPTIONS.map((option) => (
                        <div key={option.id}>
                          <RadioGroupItem
                            value={option.id}
                            id={option.id}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={option.id}
                            className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border-2 border-muted bg-transparent p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 cursor-pointer transition-all"
                          >
                            <div className="flex flex-col gap-1 mb-2 sm:mb-0">
                              <span className="font-semibold text-foreground">
                                {option.label}
                              </span>
                              <span className="text-sm text-muted-foreground font-normal">
                                {option.description}
                              </span>
                            </div>
                            <span className="font-medium text-primary whitespace-nowrap">
                              {option.isTaxi ? 'At taxi prices' : option.price === 0 ? 'Free' : `₾${option.price.toFixed(2)}`}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {deliveryMethod !== 'pickup' && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                      <Label htmlFor="address">Delivery Address *</Label>
                      <Textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required={deliveryMethod !== 'pickup'}
                        className="bg-input text-foreground placeholder:text-muted-foreground resize-none"
                        placeholder="Street address, apartment number, entrance, floor"
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="space-y-2 pt-2">
                    <Label htmlFor="instructions">Additional Instructions</Label>
                    <Textarea
                      id="instructions"
                      name="instructions"
                      value={formData.instructions}
                      onChange={handleInputChange}
                      className="bg-input text-foreground placeholder:text-muted-foreground resize-none"
                      placeholder="Any special requests or directions for the courier"
                      rows={2}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 active:scale-98 h-12 text-lg mt-8"
                >
                  Place Order
                </Button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-card rounded-2xl p-6 md:p-8 border border-border shadow-sm sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item) => {
                  const itemName = item.name?.[language] || item.name?.en || '';
                  return (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <img
                        src={item.image}
                        alt={itemName}
                        className="w-16 h-16 rounded-lg object-cover bg-muted"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1 truncate">{itemName}</h3>
                        <p className="text-sm text-muted-foreground">
                          ₾{item.price.toFixed(2)} × {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-primary mt-1">
                          ₾{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium tabular-nums">₾{subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery Fee</span>
                  <span className="font-medium tabular-nums">
                    {selectedDelivery?.isTaxi ? 'At taxi prices' : `₾${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary tabular-nums">
                    ₾{total.toFixed(2)}
                    {selectedDelivery?.isTaxi && <span className="text-xs font-normal text-muted-foreground ml-1">+ Taxi</span>}
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border/50">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Estimated {deliveryMethod === 'pickup' ? 'preparation' : 'delivery'}: 
                  <span className="font-semibold text-foreground ml-1">
                    {deliveryMethod === 'pickup' ? '20–30 min' : '55–85 min'}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
