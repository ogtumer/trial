import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { CheckCircle, Users, Zap, Shield, Clock, ArrowRight, Star, Building, Code, GitBranch, BarChart3, Mail, ChevronDown } from 'lucide-react'
import './App.css'

function App() {
  const [selectedEdition, setSelectedEdition] = useState(null)
  const [quizStep, setQuizStep] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [showSignup, setShowSignup] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    teamSize: ''
  })
  const [emailError, setEmailError] = useState('')

  const quizQuestions = [
    {
      question: "How many developers are in your team?",
      options: [
        { value: "individual", label: "Just me (Individual developer)", edition: "community" },
        { value: "small", label: "2-10 developers", edition: "teams" },
        { value: "large", label: "10+ developers", edition: "teams" },
        { value: "enterprise", label: "50+ developers (Enterprise)", edition: "teams" }
      ]
    },
    {
      question: "What type of projects do you work on?",
      options: [
        { value: "personal", label: "Personal/Open source projects", edition: "community" },
        { value: "startup", label: "Startup/Small business applications", edition: "teams" },
        { value: "enterprise", label: "Enterprise/Mission-critical applications", edition: "teams" },
        { value: "legacy", label: "Large legacy codebases", edition: "teams" }
      ]
    },
    {
      question: "Do you use CI/CD pipelines?",
      options: [
        { value: "no", label: "No, I don't use CI/CD", edition: "community" },
        { value: "basic", label: "Basic CI/CD setup", edition: "teams" },
        { value: "advanced", label: "Advanced CI/CD with multiple environments", edition: "teams" },
        { value: "enterprise", label: "Enterprise-grade CI/CD infrastructure", edition: "teams" }
      ]
    }
  ]

  const handleQuizAnswer = (answer) => {
    const newAnswers = { ...quizAnswers, [quizStep]: answer }
    setQuizAnswers(newAnswers)
    
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1)
    } else {
      // Determine recommended edition based on answers
      const teamsCount = Object.values(newAnswers).filter(a => a.edition === 'teams').length
      const recommendedEdition = teamsCount >= 2 ? 'teams' : 'community'
      setSelectedEdition(recommendedEdition)
    }
  }

  const resetQuiz = () => {
    setQuizStep(0)
    setQuizAnswers({})
    setSelectedEdition(null)
  }

  const handleEmailChange = (e) => {
    const email = e.target.value
    setFormData({ ...formData, email })
    
    // Basic email validation
    if (email && !email.includes('@')) {
      setEmailError('Please enter a valid email address')
    } else if (email && (email.includes('@example.com') || email.includes('@test.com') || email.includes('@gmail.com'))) {
      setEmailError('Please use your business email address. Generic email domains are not supported for the Teams Edition trial.')
    } else {
      setEmailError('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (emailError) return
    
    // Simulate form submission
    alert('Thank you! Your trial request has been submitted. Check your email for next steps.')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Diffblue</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-600 hover:text-gray-900">Products</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Solutions</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Resources</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
            </nav>
            <Button variant="outline">Contact Sales</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Zap className="w-4 h-4 mr-1" />
            250x Faster Than Manual Testing
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Unit Testing for
            <span className="text-blue-600 block">Enterprise Development</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Harness the power of AI to generate and maintain unit tests automatically. 
            Trusted by Fortune 500 companies to accelerate development and ensure code quality.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">250x</div>
              <div className="text-gray-600">Faster test generation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">90%</div>
              <div className="text-gray-600">Code coverage improvement</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Enterprise customers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      {!selectedEdition && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Which Edition is Right for You?
              </h2>
              <p className="text-lg text-gray-600">
                Answer a few quick questions to get personalized recommendations
              </p>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{quizQuestions[quizStep].question}</CardTitle>
                  <Badge variant="outline">{quizStep + 1} of {quizQuestions.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {quizQuestions[quizStep].options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-auto p-4 text-left"
                    onClick={() => handleQuizAnswer(option)}
                  >
                    <div>
                      <div className="font-medium">{option.label}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" />
                  </Button>
                ))}
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Edition Comparison */}
      {selectedEdition && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedEdition === 'teams' ? 'Teams Edition Recommended' : 'Choose Your Edition'}
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Based on your answers, here's what we recommend for your needs
              </p>
              <Button variant="ghost" onClick={resetQuiz} className="text-blue-600">
                Retake Quiz
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Community Edition */}
              <Card className={`relative ${selectedEdition === 'community' ? 'ring-2 ring-blue-500' : ''}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Community Edition</CardTitle>
                      <CardDescription className="text-lg mt-2">Perfect for individual developers</CardDescription>
                    </div>
                    <Badge variant="secondary">Free</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>AI-automated unit test generation in IntelliJ</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Automated test maintenance as you make changes</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Codebase & environment context-accuracy</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>Community support</span>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Ideal if you:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Want to continuously unit test quickly and efficiently</li>
                      <li>• Slash time spent maintaining test code</li>
                      <li>• Want to extend test coverage quickly</li>
                      <li>• Want to write code more and toil less</li>
                    </ul>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={selectedEdition === 'community' ? 'default' : 'outline'}
                    onClick={() => window.open('https://plugins.jetbrains.com/plugin/10574-diffblue-cover', '_blank')}
                  >
                    Install IntelliJ Plugin
                  </Button>
                </CardContent>
              </Card>

              {/* Teams Edition */}
              <Card className={`relative ${selectedEdition === 'teams' ? 'ring-2 ring-blue-500' : ''}`}>
                {selectedEdition === 'teams' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Recommended for You
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">Teams Edition</CardTitle>
                      <CardDescription className="text-lg mt-2">For team members & larger projects</CardDescription>
                    </div>
                    <Badge>14-day trial</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                    <strong>All Community Edition features, plus:</strong>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span><strong>CLI for test generation at scale</strong></span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span><strong>CI/CD integrations</strong> for automated testing</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span><strong>Code coverage tracking</strong> and reporting</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span><strong>Priority email support</strong></span>
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-semibold mb-2">Perfect for:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Fortune 500 companies with complex codebases</li>
                      <li>• Teams requiring enterprise-grade CI/CD integration</li>
                      <li>• Organizations needing comprehensive coverage reporting</li>
                      <li>• Legacy system modernization projects</li>
                    </ul>
                  </div>

                  <Button 
                    className="w-full" 
                    variant={selectedEdition === 'teams' ? 'default' : 'outline'}
                    onClick={() => setShowSignup(true)}
                  >
                    Start 14-Day Trial
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Enterprise Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Fortune 500 Companies
            </h2>
            <p className="text-lg text-gray-600">
              See how enterprise teams are transforming their testing workflows
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Building className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Global Financial Services</h3>
                    <p className="text-sm text-gray-600">Fortune 100 Company</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "Diffblue Cover helped us achieve 85% code coverage on our legacy trading systems, 
                  reducing our testing time from weeks to days."
                </blockquote>
                <div className="flex items-center text-sm text-gray-600">
                  <BarChart3 className="w-4 h-4 mr-1" />
                  <span>85% coverage increase</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Building className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">Healthcare Technology</h3>
                    <p className="text-sm text-gray-600">Fortune 500 Company</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "The CI/CD integration was seamless. We now generate tests automatically 
                  for every deployment, ensuring our patient data systems are bulletproof."
                </blockquote>
                <div className="flex items-center text-sm text-gray-600">
                  <GitBranch className="w-4 h-4 mr-1" />
                  <span>100% CI/CD coverage</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Building className="w-8 h-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold">E-commerce Platform</h3>
                    <p className="text-sm text-gray-600">Fortune 200 Company</p>
                  </div>
                </div>
                <blockquote className="text-gray-700 mb-4">
                  "With 200+ microservices, manual testing was impossible. Diffblue Cover 
                  scales with our architecture and maintains quality across all services."
                </blockquote>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>90% time reduction</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Signup Modal/Section */}
      {showSignup && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start Your Teams Edition Trial
              </h2>
              <p className="text-lg text-gray-600">
                Get everything you need to try Cover with your team
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All-in-one unit test automation for larger teams</CardTitle>
                <CardDescription>
                  with complex codebases & needs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="form" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sso">Continue with SSO</TabsTrigger>
                    <TabsTrigger value="form">Get Started</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="sso" className="space-y-4">
                    <div className="text-center py-8">
                      <Button className="w-full mb-3" variant="outline">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                          <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                          <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                          <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        Continue with Google
                      </Button>
                      <Button className="w-full mb-3" variant="outline">
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Continue with GitHub
                      </Button>
                      <p className="text-sm text-gray-600">
                        Secure single sign-on for enterprise users
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="form" className="space-y-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First name*</Label>
                          <Input
                            id="firstName"
                            placeholder="First name"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last name*</Label>
                          <Input
                            id="lastName"
                            placeholder="Last name"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Work email*</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="We'll send everything you need to try Cover"
                          value={formData.email}
                          onChange={handleEmailChange}
                          required
                          className={emailError ? 'border-red-500' : ''}
                        />
                        {emailError && (
                          <p className="text-sm text-red-600 mt-1 flex items-center">
                            <Mail className="w-4 h-4 mr-1" />
                            {emailError}
                          </p>
                        )}
                        <p className="text-xs text-gray-500 mt-1">
                          Powered by enterprise email validation
                        </p>
                      </div>
                      
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          placeholder="Your company name"
                          value={formData.company}
                          onChange={(e) => setFormData({...formData, company: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="teamSize">Team size</Label>
                        <select 
                          id="teamSize"
                          className="w-full p-2 border border-gray-300 rounded-md"
                          value={formData.teamSize}
                          onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                        >
                          <option value="">Select team size</option>
                          <option value="2-10">2-10 developers</option>
                          <option value="11-50">11-50 developers</option>
                          <option value="51-200">51-200 developers</option>
                          <option value="200+">200+ developers</option>
                        </select>
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={!!emailError || !formData.firstName || !formData.lastName || !formData.email}
                      >
                        Start Free Trial
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Security & Trust */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <Shield className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-gray-300">
                Your data is never shared and Diffblue never sees your code.
              </p>
            </div>
            <div>
              <Zap className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast</h3>
              <p className="text-gray-300">
                Cover can write unit tests 250x faster than a developer.
              </p>
            </div>
            <div>
              <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Reliable</h3>
              <p className="text-gray-300">
                Outputs guaranteed to always compile, run and be correct.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">Diffblue</span>
              </div>
              <p className="text-gray-600">
                AI-powered unit testing for enterprise development teams.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Cover</a></li>
                <li><a href="#" className="hover:text-gray-900">Enterprise</a></li>
                <li><a href="#" className="hover:text-gray-900">Integrations</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Documentation</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">Case Studies</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
              <ul className="space-y-2 text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Careers</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-gray-600">
            <p>&copy; 2024 Diffblue. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

