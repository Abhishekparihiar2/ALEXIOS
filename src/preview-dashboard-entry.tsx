import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.css'

// Temporarily patch App to skip login for preview
import {
  LayoutDashboard, Users, Building2, MapPin, Calendar, Clock, FileText,
  ClipboardList, CheckSquare, MessageSquare, FolderOpen, GraduationCap,
  Truck, Zap, DollarSign, Settings, Layers, HelpCircle, Headphones,
  ChevronLeft, ChevronRight, Bell, Search, LogOut, User, ChevronDown,
  TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Activity,
  MapIcon, ExternalLink, Navigation, ListChecks, Send, RefreshCw,
  UserCheck, UserX, Clock3, Route, X, Shield, Eye, EyeOff,
  AlertCircle, Loader2, Lock,
} from 'lucide-react'
import rfiLogo from './imports/rfi_security_llc_logo.jpg'

// Just re-export App but set authenticated=true by default
function AppDirect() {
  // Render the full App but directly show dashboard
  return <div style={{ width: '100%', height: '100vh' }}>Dashboard Preview</div>
}

// Actually just render App - user will see login, that's fine for now
import App from './app/App'
ReactDOM.createRoot(document.getElementById('root')!).render(<App />)
