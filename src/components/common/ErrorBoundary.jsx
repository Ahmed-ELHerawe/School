import { Component } from 'react';
import { AlertTriangle } from 'lucide-react';

export default class ErrorBoundary extends Component {
  constructor(props) { super(props); this.state = { hasError: false, error: null }; }
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error('ErrorBoundary caught:', error, info); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center mb-4">
            <AlertTriangle size={28} className="text-red-500" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">حدث خطأ غير متوقع</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Something went wrong loading this page.</p>
          <button onClick={() => this.setState({ hasError: false, error: null })}
            className="btn-primary">إعادة المحاولة / Retry</button>
        </div>
      );
    }
    return this.props.children;
  }
}
