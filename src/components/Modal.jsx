import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import PTDaemonDeviceDescription from '../pages/PTDaemon/PTDaemonDeviceDescription';
import PTDaemonDeviceRangeSettings from '../pages/PTDaemon/PTDaemonDeviceRangeSettings';
import { useTranslation } from 'react-i18next';

const Modal = ({ closeModal, action, addDevicePanel, activeTab }) => {
  const { t } = useTranslation();
  const [noClicked, setNoClicked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [closeModal]);

  const addDevice = (val) => {
    addDevicePanel(val);
  };

  const getModalClasses = () => {
    switch (action) {
      case 'footer':
      case 'addDevice':
      case '':
        return 'w-full max-w-md mx-4 sm:mx-6 md:mx-8';
      case 'deviceDescription':
      case 'rangeSettings':
        return 'w-full max-w-7xl mx-4 sm:mx-6 md:mx-8 h-[90vh] max-h-[800px]';
      default:
        return 'w-full max-w-6xl mx-4 sm:mx-6 md:mx-8 h-[85vh] max-h-[700px]';
    }
  };

  const isLargeModal = action === 'deviceDescription' || action === 'rangeSettings';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8" 
      role="dialog" 
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={closeModal}
        aria-hidden="true"
      />
      
      {/* Modal Container */}
      <div
        className={`
          bg-white rounded-lg shadow-xl z-50 relative flex flex-col
          ${getModalClasses()}
          ${isLargeModal ? 'overflow-hidden' : ''}
        `}
        role="document"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex-1 min-w-0">
            {action === 'deviceDescription' && (
              <h2 id="modal-title" className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                {t('Modal.device_description')}
              </h2>
            )}
            {action === 'rangeSettings' && (
              <h2 id="modal-title" className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                {t('Modal.range_settings')}
              </h2>
            )}
            {action === 'footer' && (
              <h2 id="modal-title" className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                {t('Modal.quit_application')}
              </h2>
            )}
            {action === 'addDevice' && (
              <h2 id="modal-title" className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                {t('Modal.add_device')}
              </h2>
            )}
            {!action && activeTab && (
              <h2 id="modal-title" className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 truncate">
                {t('Modal.at_least_one', { activeTab })}
              </h2>
            )}
          </div>
          
          <button
            onClick={closeModal}
            className="ml-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 flex-shrink-0"
            aria-label="Close"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white rounded-full border-2 border-gray-300 shadow-sm hover:shadow-md transition-all duration-200 hover:rotate-90">
              <CloseIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
        </div>

        {/* Content */}
        <div className={`flex-1 ${isLargeModal ? 'overflow-hidden' : ''}`}>
          {action === 'footer' && (
            <div className="p-4 sm:p-6">
              <p id="modal-description" className="text-gray-700 text-center text-sm sm:text-base">
                {t('Modal.quit_confirmation')}
              </p>
            </div>
          )}

          {action === 'addDevice' && (
            <div className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                <button
                  onClick={() => {
                    addDevice('Power Analyzer');
                    closeModal();
                  }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg transition duration-300 bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base font-medium"
                >
                  {t('Modal.power_analyzer')}
                </button>
                <button
                  onClick={() => {
                    addDevice('Temperature Sensor');
                    closeModal();
                  }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg transition duration-300 bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base font-medium"
                >
                  {t('Modal.temperature_sensor')}
                </button>
              </div>
            </div>
          )}

          {action === 'deviceDescription' && (
            <div className="flex flex-col h-full p-4 sm:p-6">
              <div className="flex-1 overflow-auto border rounded-lg bg-gray-50 min-h-0">
                <div className="p-4">
                  <PTDaemonDeviceDescription />
                </div>
              </div>
            </div>
          )}

          {action === 'rangeSettings' && (
            <div className="flex flex-col h-full p-4 sm:p-6">
              <div className="flex-1 overflow-auto min-h-0">
                <PTDaemonDeviceRangeSettings />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 sm:p-6 flex-shrink-0">
          {action === 'footer' && (
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={() => {
                  navigate('/Start');
                  closeModal();
                }}
                className={`w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg transition duration-300 text-sm sm:text-base font-medium ${
                  noClicked 
                    ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                {t('Modal.yes')}
              </button>
              <button
                onClick={() => {
                  setNoClicked(true);
                  closeModal();
                }}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg transition duration-300 bg-gray-200 text-gray-800 hover:bg-gray-300 text-sm sm:text-base font-medium"
              >
                {t('Modal.no')}
              </button>
            </div>
          )}

          {!action && activeTab && (
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setNoClicked(true);
                  closeModal();
                }}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg transition duration-300 bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base font-medium"
              >
                {t('Modal.ok')}
              </button>
            </div>
          )}

          {(action === 'deviceDescription' || action === 'rangeSettings') && (
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
              <button
                onClick={closeModal}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg transition duration-300 bg-blue-600 text-white hover:bg-blue-700 text-sm sm:text-base font-medium"
              >
                {t('Modal.ok')}
              </button>
              <button
                onClick={() => {
                  setNoClicked(true);
                  closeModal();
                }}
                className="w-full sm:w-auto px-4 sm:px-6 py-3 rounded-lg transition duration-300 bg-gray-200 text-gray-800 hover:bg-gray-300 text-sm sm:text-base font-medium"
              >
                {t('Modal.cancel')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;