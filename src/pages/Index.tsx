import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Project {
  id: number;
  title: string;
  image: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  price: number;
  style: string;
  floors: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Резиденция Аврора',
    image: 'https://cdn.poehali.dev/projects/2dd7ce01-b58b-46b6-84ad-badad62b7ea9/files/d574fffb-caa9-4dbe-9aae-f0340e6dd461.jpg',
    area: 450,
    bedrooms: 5,
    bathrooms: 4,
    price: 85000000,
    style: 'Современный',
    floors: 2,
  },
  {
    id: 2,
    title: 'Вилла Гармония',
    image: 'https://cdn.poehali.dev/projects/2dd7ce01-b58b-46b6-84ad-badad62b7ea9/files/d8dd041d-f8a8-4a78-88df-6967a32ab18d.jpg',
    area: 380,
    bedrooms: 4,
    bathrooms: 3,
    price: 72000000,
    style: 'Минимализм',
    floors: 2,
  },
  {
    id: 3,
    title: 'Особняк Элегия',
    image: 'https://cdn.poehali.dev/projects/2dd7ce01-b58b-46b6-84ad-badad62b7ea9/files/912a5066-3f98-42b6-83cb-ae62f6d42834.jpg',
    area: 520,
    bedrooms: 6,
    bathrooms: 5,
    price: 95000000,
    style: 'Классический',
    floors: 3,
  },
  {
    id: 4,
    title: 'Резиденция Престиж',
    image: 'https://cdn.poehali.dev/projects/2dd7ce01-b58b-46b6-84ad-badad62b7ea9/files/d574fffb-caa9-4dbe-9aae-f0340e6dd461.jpg',
    area: 420,
    bedrooms: 4,
    bathrooms: 4,
    price: 78000000,
    style: 'Современный',
    floors: 2,
  },
  {
    id: 5,
    title: 'Вилла Магнат',
    image: 'https://cdn.poehali.dev/projects/2dd7ce01-b58b-46b6-84ad-badad62b7ea9/files/d8dd041d-f8a8-4a78-88df-6967a32ab18d.jpg',
    area: 600,
    bedrooms: 7,
    bathrooms: 6,
    price: 120000000,
    style: 'Современный',
    floors: 3,
  },
  {
    id: 6,
    title: 'Особняк Тихая Гавань',
    image: 'https://cdn.poehali.dev/projects/2dd7ce01-b58b-46b6-84ad-badad62b7ea9/files/912a5066-3f98-42b6-83cb-ae62f6d42834.jpg',
    area: 350,
    bedrooms: 3,
    bathrooms: 3,
    price: 65000000,
    style: 'Минимализм',
    floors: 2,
  },
];

const Index = () => {
  const [areaRange, setAreaRange] = useState([250, 650]);
  const [selectedBedrooms, setSelectedBedrooms] = useState('all');
  const [selectedStyle, setSelectedStyle] = useState('all');

  const [loanAmount, setLoanAmount] = useState(50000000);
  const [downPayment, setDownPayment] = useState(15000000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTerm, setLoanTerm] = useState(20);

  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    propertyType: '',
    budget: '',
    bedrooms: '',
    name: '',
    phone: '',
    email: '',
  });

  const filteredProjects = projects.filter((project) => {
    if (project.area < areaRange[0] || project.area > areaRange[1]) return false;
    if (selectedBedrooms !== 'all' && project.bedrooms !== parseInt(selectedBedrooms)) return false;
    if (selectedStyle !== 'all' && project.style !== selectedStyle) return false;
    return true;
  });

  const calculateMortgage = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyPayment =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;
    return { monthlyPayment, totalPayment, totalInterest };
  };

  const mortgage = calculateMortgage();

  const quizQuestions = [
    {
      question: 'Какой тип недвижимости вас интересует?',
      options: ['Дом', 'Вилла', 'Таунхаус', 'Резиденция'],
      field: 'propertyType',
    },
    {
      question: 'Ваш бюджет?',
      options: ['До 50 млн ₽', '50-80 млн ₽', '80-100 млн ₽', 'Более 100 млн ₽'],
      field: 'budget',
    },
    {
      question: 'Количество спален?',
      options: ['2-3', '4-5', '6+'],
      field: 'bedrooms',
    },
  ];

  const scrollToSection = (section: string) => {
    const element = document.getElementById(section);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">ЭЛИТ СТРОЙ</h1>
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-sm font-medium hover:text-accent transition-colors">
                Главная
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-sm font-medium hover:text-accent transition-colors">
                Проекты
              </button>
              <button onClick={() => scrollToSection('about')} className="text-sm font-medium hover:text-accent transition-colors">
                О компании
              </button>
              <button onClick={() => scrollToSection('calculator')} className="text-sm font-medium hover:text-accent transition-colors">
                Калькулятор
              </button>
              <button onClick={() => scrollToSection('reviews')} className="text-sm font-medium hover:text-accent transition-colors">
                Отзывы
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-sm font-medium hover:text-accent transition-colors">
                Контакты
              </button>
            </div>
            <Button onClick={() => scrollToSection('quiz')} className="bg-accent hover:bg-accent/90">
              Оставить заявку
            </Button>
          </nav>
        </div>
      </header>

      <main className="pt-20">
        <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://cdn.poehali.dev/projects/2dd7ce01-b58b-46b6-84ad-badad62b7ea9/files/d574fffb-caa9-4dbe-9aae-f0340e6dd461.jpg')`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
          </div>
          <div className="relative z-10 container mx-auto px-4 text-white animate-fade-in">
            <h2 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Элитное строительство
              <br />
              <span className="text-accent">вашей мечты</span>
            </h2>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl font-light">
              Создаём уникальные резиденции премиум-класса с безупречным качеством и вниманием к деталям
            </p>
            <div className="flex gap-4">
              <Button onClick={() => scrollToSection('projects')} size="lg" className="bg-accent hover:bg-accent/90 text-white">
                Смотреть проекты
              </Button>
              <Button onClick={() => scrollToSection('quiz')} size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Консультация
              </Button>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-4">Наши проекты</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Эксклюзивные резиденции премиум-класса</p>

            <div className="bg-card rounded-lg p-6 mb-12 border border-border">
              <h3 className="text-xl font-semibold mb-6">Фильтры</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <Label className="text-base mb-4 block">
                    Площадь: {areaRange[0]} - {areaRange[1]} м²
                  </Label>
                  <Slider
                    min={250}
                    max={650}
                    step={10}
                    value={areaRange}
                    onValueChange={setAreaRange}
                    className="mb-2"
                  />
                </div>

                <div>
                  <Label className="text-base mb-4 block">Количество спален</Label>
                  <RadioGroup value={selectedBedrooms} onValueChange={setSelectedBedrooms}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="bed-all" />
                      <Label htmlFor="bed-all" className="cursor-pointer">Все</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="bed-3" />
                      <Label htmlFor="bed-3" className="cursor-pointer">3 спальни</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="4" id="bed-4" />
                      <Label htmlFor="bed-4" className="cursor-pointer">4 спальни</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="5" id="bed-5" />
                      <Label htmlFor="bed-5" className="cursor-pointer">5+ спален</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base mb-4 block">Стиль</Label>
                  <RadioGroup value={selectedStyle} onValueChange={setSelectedStyle}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="style-all" />
                      <Label htmlFor="style-all" className="cursor-pointer">Все стили</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Современный" id="style-modern" />
                      <Label htmlFor="style-modern" className="cursor-pointer">Современный</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Минимализм" id="style-minimal" />
                      <Label htmlFor="style-minimal" className="cursor-pointer">Минимализм</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Классический" id="style-classic" />
                      <Label htmlFor="style-classic" className="cursor-pointer">Классический</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden hover-scale cursor-pointer border-border">
                  <div className="relative h-64 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <Badge className="absolute top-4 right-4 bg-accent">{project.style}</Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-semibold mb-3">{project.title}</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Home" size={18} />
                        <span>{project.area} м²</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Bed" size={18} />
                        <span>{project.bedrooms} спален</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Bath" size={18} />
                        <span>{project.bathrooms} санузла</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-2xl font-bold text-accent">{(project.price / 1000000).toFixed(1)} млн ₽</span>
                      <Button variant="outline">Подробнее</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6">О компании</h2>
                <p className="text-lg mb-6 text-muted-foreground leading-relaxed">
                  ЭЛИТ СТРОЙ — лидер в сфере элитного загородного строительства с 15-летним опытом создания уникальных резиденций
                  премиум-класса.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-accent mb-2">150+</div>
                    <div className="text-sm text-muted-foreground">Реализованных проектов</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-accent mb-2">15</div>
                    <div className="text-sm text-muted-foreground">Лет на рынке</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-accent mb-2">98%</div>
                    <div className="text-sm text-muted-foreground">Довольных клиентов</div>
                  </div>
                  <div className="text-center p-4">
                    <div className="text-4xl font-bold text-accent mb-2">50+</div>
                    <div className="text-sm text-muted-foreground">Специалистов в команде</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Icon name="Award" size={64} className="text-accent mx-auto" />
                <Icon name="Shield" size={64} className="text-accent mx-auto" />
                <Icon name="Users" size={64} className="text-accent mx-auto" />
                <Icon name="TrendingUp" size={64} className="text-accent mx-auto" />
              </div>
            </div>
          </div>
        </section>

        <section id="calculator" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-5xl font-bold text-center mb-4">Калькулятор ипотеки</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Рассчитайте ежемесячный платёж</p>

            <Card className="p-8 border-border">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-base mb-3 block">Стоимость недвижимости</Label>
                    <Input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="text-lg"
                    />
                    <Slider
                      min={30000000}
                      max={150000000}
                      step={1000000}
                      value={[loanAmount]}
                      onValueChange={(val) => setLoanAmount(val[0])}
                      className="mt-3"
                    />
                  </div>

                  <div>
                    <Label className="text-base mb-3 block">Первоначальный взнос</Label>
                    <Input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="text-lg"
                    />
                    <Slider
                      min={0}
                      max={loanAmount}
                      step={500000}
                      value={[downPayment]}
                      onValueChange={(val) => setDownPayment(val[0])}
                      className="mt-3"
                    />
                  </div>

                  <div>
                    <Label className="text-base mb-3 block">Процентная ставка (%)</Label>
                    <Input
                      type="number"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="text-lg"
                    />
                    <Slider
                      min={5}
                      max={20}
                      step={0.1}
                      value={[interestRate]}
                      onValueChange={(val) => setInterestRate(val[0])}
                      className="mt-3"
                    />
                  </div>

                  <div>
                    <Label className="text-base mb-3 block">Срок кредита (лет)</Label>
                    <Input
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="text-lg"
                    />
                    <Slider
                      min={5}
                      max={30}
                      step={1}
                      value={[loanTerm]}
                      onValueChange={(val) => setLoanTerm(val[0])}
                      className="mt-3"
                    />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-6 space-y-4">
                  <h3 className="text-2xl font-semibold mb-6">Результаты расчёта</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Ежемесячный платёж</div>
                      <div className="text-3xl font-bold text-accent">
                        {mortgage.monthlyPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽
                      </div>
                    </div>
                    <div className="pt-4 border-t border-border">
                      <div className="text-sm text-muted-foreground mb-1">Сумма кредита</div>
                      <div className="text-xl font-semibold">
                        {(loanAmount - downPayment).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Переплата по кредиту</div>
                      <div className="text-xl font-semibold">
                        {mortgage.totalInterest.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Общая сумма выплат</div>
                      <div className="text-xl font-semibold">
                        {mortgage.totalPayment.toLocaleString('ru-RU', { maximumFractionDigits: 0 })} ₽
                      </div>
                    </div>
                  </div>
                  <Button onClick={() => scrollToSection('quiz')} className="w-full mt-6 bg-accent hover:bg-accent/90">
                    Оформить заявку
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="reviews" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-4">Отзывы клиентов</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Что говорят о нас наши клиенты</p>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card className="p-6 border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Профессиональная команда, которая воплотила все наши пожелания. Качество строительства на высшем уровне!"
                </p>
                <div className="font-semibold">Александр К.</div>
                <div className="text-sm text-muted-foreground">Резиденция Аврора</div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Благодарим за индивидуальный подход и внимание к деталям. Наш дом превзошёл все ожидания!"
                </p>
                <div className="font-semibold">Мария С.</div>
                <div className="text-sm text-muted-foreground">Вилла Гармония</div>
              </Card>

              <Card className="p-6 border-border">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon key={i} name="Star" size={20} className="text-accent fill-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Надёжная компания с безупречной репутацией. Рекомендуем всем, кто ценит качество и стиль!"
                </p>
                <div className="font-semibold">Дмитрий В.</div>
                <div className="text-sm text-muted-foreground">Особняк Элегия</div>
              </Card>
            </div>
          </div>
        </section>

        <section id="quiz" className="py-20 bg-background">
          <div className="container mx-auto px-4 max-w-2xl">
            <h2 className="text-5xl font-bold text-center mb-4">Получить консультацию</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Ответьте на несколько вопросов</p>

            <Card className="p-8 border-border">
              {quizStep < quizQuestions.length ? (
                <div className="space-y-6 animate-fade-in">
                  <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                      {quizQuestions.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 flex-1 rounded ${
                            index <= quizStep ? 'bg-accent' : 'bg-muted'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Шаг {quizStep + 1} из {quizQuestions.length + 1}
                    </p>
                  </div>

                  <h3 className="text-2xl font-semibold mb-6">{quizQuestions[quizStep].question}</h3>

                  <RadioGroup
                    value={quizAnswers[quizQuestions[quizStep].field as keyof typeof quizAnswers]}
                    onValueChange={(value) => {
                      setQuizAnswers({
                        ...quizAnswers,
                        [quizQuestions[quizStep].field]: value,
                      });
                    }}
                  >
                    {quizQuestions[quizStep].options.map((option) => (
                      <div key={option} className="flex items-center space-x-2 p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value={option} id={option} />
                        <Label htmlFor={option} className="cursor-pointer flex-1">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  <div className="flex gap-4 pt-4">
                    {quizStep > 0 && (
                      <Button variant="outline" onClick={() => setQuizStep(quizStep - 1)} className="flex-1">
                        Назад
                      </Button>
                    )}
                    <Button
                      onClick={() => setQuizStep(quizStep + 1)}
                      disabled={!quizAnswers[quizQuestions[quizStep].field as keyof typeof quizAnswers]}
                      className="flex-1 bg-accent hover:bg-accent/90"
                    >
                      Далее
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 animate-fade-in">
                  <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                      {[...Array(quizQuestions.length + 1)].map((_, index) => (
                        <div key={index} className="h-2 flex-1 rounded bg-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground">Последний шаг</p>
                  </div>

                  <h3 className="text-2xl font-semibold mb-6">Оставьте ваши контакты</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        placeholder="Ваше имя"
                        value={quizAnswers.name}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Телефон</Label>
                      <Input
                        id="phone"
                        placeholder="+7 (___) ___-__-__"
                        value={quizAnswers.phone}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={quizAnswers.email}
                        onChange={(e) => setQuizAnswers({ ...quizAnswers, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button variant="outline" onClick={() => setQuizStep(quizStep - 1)} className="flex-1">
                      Назад
                    </Button>
                    <Button
                      onClick={() => {
                        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
                        setQuizStep(0);
                        setQuizAnswers({ propertyType: '', budget: '', bedrooms: '', name: '', phone: '', email: '' });
                      }}
                      disabled={!quizAnswers.name || !quizAnswers.phone}
                      className="flex-1 bg-accent hover:bg-accent/90"
                    >
                      Отправить заявку
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </section>

        <section id="contact" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold text-center mb-4">Контакты</h2>
            <p className="text-center text-muted-foreground mb-12 text-lg">Свяжитесь с нами любым удобным способом</p>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="p-6 text-center border-border">
                <Icon name="Phone" size={48} className="text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Телефон</h3>
                <p className="text-muted-foreground">+7 (495) 123-45-67</p>
              </Card>

              <Card className="p-6 text-center border-border">
                <Icon name="Mail" size={48} className="text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-muted-foreground">info@elitstroi.ru</p>
              </Card>

              <Card className="p-6 text-center border-border">
                <Icon name="MapPin" size={48} className="text-accent mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Адрес</h3>
                <p className="text-muted-foreground">Москва, Кутузовский пр-т, 32</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ЭЛИТ СТРОЙ</h3>
              <p className="text-sm opacity-80">Элитное загородное строительство премиум-класса</p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Компания</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>О нас</p>
                <p>Проекты</p>
                <p>Отзывы</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Услуги</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>Строительство</p>
                <p>Проектирование</p>
                <p>Дизайн интерьера</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Контакты</h4>
              <div className="space-y-2 text-sm opacity-80">
                <p>+7 (495) 123-45-67</p>
                <p>info@elitstroi.ru</p>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 pt-8 text-center text-sm opacity-80">
            <p>© 2024 ЭЛИТ СТРОЙ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;