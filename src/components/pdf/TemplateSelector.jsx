import { HiCheckCircle, HiInformationCircle } from "react-icons/hi2"
import { templatesList } from "../../templates"
import { useResume } from "../../contexts/ResumeContext"

const TemplateSelector = () => {
  const { state, dispatch } = useResume()
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          Choose Your Template
        </h3>
        <p className="text-sm text-gray-400">
          Select a design that best represents your professional style
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templatesList.map(template => (
          <button
            key={template.id}
            onClick={() => dispatch({ type: 'SET_TEMPLATE', template: template.id })}
            className={`group relative p-4 border rounded-lg transition-all duration-200 text-left ${
              state.selectedTemplate === template.id
                ? 'border-orange-500 bg-orange-500/10 shadow-lg'
                : 'border-gray-800 hover:border-orange-500/50 hover:bg-gray-800/50'
            }`}
          >
            {/* Selection indicator */}
            {state.selectedTemplate === template.id && (
              <div className="absolute top-3 right-3 w-6 h-6 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <HiCheckCircle className="w-5 h-5 text-white" />
              </div>
            )}
            
            {/* Template preview placeholder */}
            <div className="aspect-[8.5/11] bg-[#0a0a0a] rounded-lg mb-4 overflow-hidden border border-gray-800">
              <div className="p-4 space-y-2">
                {/* Simulate resume preview */}
                <div className={`h-3 rounded w-3/4 ${
                  template.id === 'professional-red' ? 'bg-red-500' :
                  template.id === 'modern-blue' ? 'bg-blue-500' :
                  'bg-orange-500'
                }`}></div>
                <div className="h-1 bg-gray-700 rounded w-1/2"></div>
                <div className="h-1 bg-gray-700 rounded w-2/3"></div>
                <div className="mt-4 space-y-1">
                  <div className="h-1 bg-gray-800 rounded"></div>
                  <div className="h-1 bg-gray-800 rounded"></div>
                  <div className="h-1 bg-gray-800 rounded w-4/5"></div>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className={`font-semibold text-base mb-1 ${
                state.selectedTemplate === template.id 
                  ? 'text-orange-400' 
                  : 'text-white'
              }`}>
                {template.name}
              </h4>
              <p className="text-xs text-gray-400">
                {template.description}
              </p>
            </div>
            
            {/* Layout indicator */}
            <div className="mt-3 flex items-center gap-2 text-xs">
              <span className="px-2 py-1 bg-gray-800 text-gray-400 rounded">
                {template.layout.type === 'two-column' ? '2 Column' : 'Single Column'}
              </span>
            </div>
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <HiInformationCircle className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h5 className="font-semibold text-blue-300 mb-1 text-sm">
              Template Tips
            </h5>
            <p className="text-xs text-blue-200/80">
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