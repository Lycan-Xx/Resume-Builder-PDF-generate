import { templatesList } from "../templates"
import { useResume } from "../contexts/ResumeContext"

const TemplateSelector = () => {
  const { state, dispatch } = useResume()
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Choose Your Template
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Select a design that best represents your professional style
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templatesList.map(template => (
          <button
            key={template.id}
            onClick={() => dispatch({ type: 'SET_TEMPLATE', template: template.id })}
            className={`group relative p-6 border-2 rounded-xl transition-all duration-200 text-left ${
              state.selectedTemplate === template.id
                ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 shadow-lg scale-105'
                : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 hover:shadow-md'
            }`}
          >
            {/* Selection indicator */}
            {state.selectedTemplate === template.id && (
              <div className="absolute top-4 right-4 w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            
            {/* Template preview placeholder */}
            <div className="aspect-[8.5/11] bg-gray-100 dark:bg-gray-800 rounded-lg mb-4 overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="p-4 space-y-2">
                {/* Simulate resume preview */}
                <div className={`h-3 rounded w-3/4 ${
                  template.id === 'professional-red' ? 'bg-red-500' :
                  template.id === 'modern-blue' ? 'bg-blue-500' :
                  'bg-gray-800'
                }`}></div>
                <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                <div className="h-1 bg-gray-300 rounded w-2/3"></div>
                <div className="mt-4 space-y-1">
                  <div className="h-1 bg-gray-200 rounded"></div>
                  <div className="h-1 bg-gray-200 rounded"></div>
                  <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className={`font-bold text-lg mb-1 ${
                state.selectedTemplate === template.id 
                  ? 'text-primary-600 dark:text-primary-400' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {template.name}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {template.description}
              </p>
            </div>
            
            {/* Layout indicator */}
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
                {template.layout.type === 'two-column' ? '2 Column' : 'Single Column'}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h5 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
              Template Tips
            </h5>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Your content will automatically adapt to the selected template. 
              All colors, fonts, and spacing are optimized for professional presentation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelector