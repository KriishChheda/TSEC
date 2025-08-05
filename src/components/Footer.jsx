import React from 'react'
import {FileText,ArrowRight} from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

function Footer() {
    // const navigate = useNavigate();
  return (
    <div>
      <footer className="relative z-10 bg-gray-900 border-t border-green-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-black" />
                </div>
                <span className="text-2xl font-bold text-green-400">Cogniscript</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
