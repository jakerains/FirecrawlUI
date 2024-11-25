import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { 
  BeakerIcon, 
  GlobeAltIcon, 
  CodeBracketIcon,
  DocumentArrowDownIcon,
  DocumentDuplicateIcon,
  ArrowPathIcon,
  ClipboardDocumentIcon
} from '@heroicons/react/24/outline';

interface OutputFormat {
  value: string;
  label: string;
  icon: typeof BeakerIcon;
  description: string;
}

const OUTPUT_FORMATS: OutputFormat[] = [
  {
    value: 'json',
    label: 'JSON',
    icon: CodeBracketIcon,
    description: 'Structured data format',
  },
  {
    value: 'csv',
    label: 'CSV',
    icon: DocumentDuplicateIcon,
    description: 'Spreadsheet compatible',
  },
  {
    value: 'markdown',
    label: 'Markdown',
    icon: DocumentArrowDownIcon,
    description: 'Human-readable text',
  },
];

const PRESET_SCHEMAS = [
  {
    title: 'Product Details',
    description: 'Extract product information',
    schema: {
      name: 'string',
      price: 'number',
      description: 'string',
      features: 'string[]',
      specifications: 'Record<string, string>',
      availability: 'boolean'
    }
  },
  {
    title: 'Article Content',
    description: 'Extract article metadata and content',
    schema: {
      title: 'string',
      author: 'string',
      publishDate: 'date',
      content: 'string',
      tags: 'string[]',
      category: 'string'
    }
  },
  {
    title: 'Company Info',
    description: 'Extract organization details',
    schema: {
      name: 'string',
      description: 'string',
      industry: 'string',
      location: 'string',
      employees: 'number',
      founded: 'date',
      contactInfo: {
        email: 'string',
        phone: 'string',
        address: 'string'
      }
    }
  },
  {
    title: 'Documentation API',
    description: 'Extract API documentation',
    schema: {
      endpoint: 'string',
      method: 'string',
      description: 'string',
      parameters: 'Array<{name: string, type: string, required: boolean, description: string}>',
      responses: 'Record<string, {description: string, schema: object}>',
      authentication: 'string'
    }
  }
];

export default function ExtractPanel() {
  const [url, setUrl] = useState('');
  const [useSchema, setUseSchema] = useState(true);
  const [prompt, setPrompt] = useState('');
  const [schema, setSchema] = useState(JSON.stringify(PRESET_SCHEMAS[0].schema, null, 2));
  const [outputFormat, setOutputFormat] = useState<string>('json');
  const [isLoading, setIsLoading] = useState(false);
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [validateOutput, setValidateOutput] = useState(true);
  const [retryOnError, setRetryOnError] = useState(true);

  const handleExtract = async () => {
    setIsLoading(true);
    // TODO: Implement extraction logic
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <TooltipProvider>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-6 bg-[#1f2937]/50 backdrop-blur-sm border-[#374151]/50 shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:20px_20px]" />
          <div className="relative space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-100 flex items-center">
                <BeakerIcon className="mr-3 h-6 w-6 text-amber-400" />
                LLM Data Extraction
              </h2>

              <div className="space-y-6">
                {/* URL Input */}
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label htmlFor="url" className="text-sm font-medium text-gray-200">Page URL</Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Enter the URL of the page to extract data from</p>
                    </TooltipContent>
                  </Tooltip>
                  <div className="relative">
                    <Input
                      id="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="bg-[#2a3441]/50 border-[#4b5563]/50 focus:border-amber-500/50 focus:ring-amber-500/20 pl-10"
                      placeholder="https://example.com/page"
                    />
                    <GlobeAltIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  </div>
                </div>

                {/* Extraction Method Toggle */}
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/30">
                  <div className="space-y-1">
                    <Label htmlFor="use-schema" className="text-sm">Use Schema</Label>
                    <p className="text-xs text-gray-500">Toggle between schema and free-form prompt</p>
                  </div>
                  <Switch
                    id="use-schema"
                    checked={useSchema}
                    onCheckedChange={setUseSchema}
                    className="data-[state=checked]:bg-amber-600"
                  />
                </div>

                {/* Schema or Prompt Input */}
                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Label 
                        htmlFor={useSchema ? "schema" : "prompt"} 
                        className="text-sm font-medium text-gray-200"
                      >
                        {useSchema ? "Schema Definition" : "Extraction Prompt"}
                      </Label>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {useSchema 
                          ? "Define the structure of data to extract (JSON schema)" 
                          : "Describe what information to extract from the page"
                        }
                      </p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {useSchema ? (
                    <div className="relative">
                      <Textarea
                        id="schema"
                        value={schema}
                        onChange={(e) => setSchema(e.target.value)}
                        className="min-h-[200px] font-mono text-sm bg-[#2a3441]/50 border-[#4b5563]/50 focus:border-amber-500/50 focus:ring-amber-500/20"
                        placeholder="Enter JSON schema..."
                      />
                      <CodeBracketIcon className="absolute right-3 top-3 h-4 w-4 text-gray-500" />
                    </div>
                  ) : (
                    <Textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[200px] bg-[#2a3441]/50 border-[#4b5563]/50 focus:border-amber-500/50 focus:ring-amber-500/20"
                      placeholder="Extract the product name, price, and key features from this page..."
                    />
                  )}
                </div>

                {/* Output Format Selection */}
                <div className="space-y-4">
                  <Label className="text-sm font-medium text-gray-200">Output Format</Label>
                  <div className="grid grid-cols-3 gap-4">
                    {OUTPUT_FORMATS.map(({ value, label, icon: Icon, description }) => (
                      <div
                        key={value}
                        className={`
                          relative p-4 rounded-lg cursor-pointer transition-all duration-200
                          ${outputFormat === value 
                            ? 'bg-amber-500/20 border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]' 
                            : 'bg-gray-800/20 border-gray-700/30'
                          }
                          border hover:border-amber-500/30 hover:bg-amber-500/10
                        `}
                        onClick={() => setOutputFormat(value)}
                      >
                        <div className="flex items-start space-x-3">
                          <Icon className={`h-5 w-5 ${outputFormat === value ? 'text-amber-400' : 'text-gray-400'}`} />
                          <div>
                            <h3 className={`text-sm font-medium ${outputFormat === value ? 'text-amber-300' : 'text-gray-300'}`}>
                              {label}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1">{description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-200">Advanced Options</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/30">
                      <div className="space-y-1">
                        <Label htmlFor="include-metadata" className="text-sm">Include Metadata</Label>
                        <p className="text-xs text-gray-500">Add page metadata to output</p>
                      </div>
                      <Switch
                        id="include-metadata"
                        checked={includeMetadata}
                        onCheckedChange={setIncludeMetadata}
                        className="data-[state=checked]:bg-amber-600"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/30">
                      <div className="space-y-1">
                        <Label htmlFor="validate-output" className="text-sm">Validate Output</Label>
                        <p className="text-xs text-gray-500">Ensure output matches schema</p>
                      </div>
                      <Switch
                        id="validate-output"
                        checked={validateOutput}
                        onCheckedChange={setValidateOutput}
                        className="data-[state=checked]:bg-amber-600"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-gray-800/20 border border-gray-700/30">
                      <div className="space-y-1">
                        <Label htmlFor="retry-on-error" className="text-sm">Retry on Error</Label>
                        <p className="text-xs text-gray-500">Attempt extraction again if failed</p>
                      </div>
                      <Switch
                        id="retry-on-error"
                        checked={retryOnError}
                        onCheckedChange={setRetryOnError}
                        className="data-[state=checked]:bg-amber-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Example Presets */}
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-gray-200">Quick Presets</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {PRESET_SCHEMAS.map((preset) => (
                      <button
                        key={preset.title}
                        onClick={() => {
                          setUseSchema(true);
                          setSchema(JSON.stringify(preset.schema, null, 2));
                        }}
                        className="p-3 text-left rounded-lg bg-gray-800/20 border border-gray-700/30 hover:border-amber-500/30 hover:bg-amber-500/10 transition-all duration-200"
                      >
                        <h4 className="text-sm font-medium text-gray-200">{preset.title}</h4>
                        <p className="text-xs text-gray-500 mt-1">{preset.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Button 
              onClick={handleExtract}
              disabled={!url || (!prompt && !schema) || isLoading}
              className={`
                w-full transition-all duration-300
                ${isLoading 
                  ? 'bg-amber-500/20 cursor-not-allowed' 
                  : 'bg-amber-500 hover:bg-amber-600 shadow-lg shadow-amber-500/20'
                }
              `}
            >
              {isLoading ? (
                <>
                  <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
                  Extracting Data...
                </>
              ) : (
                <>
                  <BeakerIcon className="w-4 h-4 mr-2" />
                  Extract Data
                </>
              )}
            </Button>
          </div>
        </Card>
      </motion.div>
    </TooltipProvider>
  );
}