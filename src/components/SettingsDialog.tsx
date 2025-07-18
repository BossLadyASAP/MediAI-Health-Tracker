
import { useState } from 'react';
import { X, Play } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedModel: string;
  onModelChange: (model: string) => void;
}

const settingsSections = [
  { id: 'general', label: 'General', icon: '⚙️' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
  { id: 'personalization', label: 'Personalization', icon: '🎨' },
  { id: 'connected-apps', label: 'Connected apps', icon: '🔗' },
  { id: 'data-controls', label: 'Data controls', icon: '🛡️' },
  { id: 'security', label: 'Security', icon: '🔒' },
  { id: 'account', label: 'Account', icon: '👤' },
];

export function SettingsDialog({ open, onOpenChange, selectedModel, onModelChange }: SettingsDialogProps) {
  const [activeSection, setActiveSection] = useState('general');
  const [theme, setTheme] = useState('System');
  const [language, setLanguage] = useState('Auto-detect');
  const [spokenLanguage, setSpokenLanguage] = useState('Auto-detect');
  const [voice, setVoice] = useState('Ember');
  const [followUpSuggestions, setFollowUpSuggestions] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [dataSharing, setDataSharing] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);

  const playVoiceSample = () => {
    // In a real app, this would play a voice sample
    console.log(`Playing ${voice} voice sample`);
  };

  const renderGeneralSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Model</h3>
          <p className="text-xs text-gray-500 mt-1">
            Choose the AI model for your conversations
          </p>
        </div>
        <Select value={selectedModel} onValueChange={onModelChange}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="GPT-4">GPT-4</SelectItem>
            <SelectItem value="GPT-3.5">GPT-3.5</SelectItem>
            <SelectItem value="Claude">Claude</SelectItem>
            <SelectItem value="Gemini">Gemini</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Theme</h3>
        </div>
        <Select value={theme} onValueChange={setTheme}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="System">System</SelectItem>
            <SelectItem value="Light">Light</SelectItem>
            <SelectItem value="Dark">Dark</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Language</h3>
        </div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Auto-detect">Auto-detect</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="French">French</SelectItem>
            <SelectItem value="German">German</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Spoken language</h3>
          <p className="text-xs text-gray-500 mt-1">
            For best results, select the language you mainly speak. If it's not listed, it may still be supported via auto-detection.
          </p>
        </div>
        <Select value={spokenLanguage} onValueChange={setSpokenLanguage}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Auto-detect">Auto-detect</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="French">French</SelectItem>
            <SelectItem value="German">German</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Voice</h3>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 w-8 p-0"
            onClick={playVoiceSample}
          >
            <Play className="h-4 w-4" />
          </Button>
          <Select value={voice} onValueChange={setVoice}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ember">Ember</SelectItem>
              <SelectItem value="Alloy">Alloy</SelectItem>
              <SelectItem value="Echo">Echo</SelectItem>
              <SelectItem value="Fable">Fable</SelectItem>
              <SelectItem value="Nova">Nova</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Show follow up suggestions in chats</h3>
        </div>
        <Switch
          checked={followUpSuggestions}
          onCheckedChange={setFollowUpSuggestions}
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Email notifications</h3>
          <p className="text-xs text-gray-500 mt-1">
            Receive updates and news via email
          </p>
        </div>
        <Switch
          checked={emailNotifications}
          onCheckedChange={setEmailNotifications}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Push notifications</h3>
          <p className="text-xs text-gray-500 mt-1">
            Get notified about important updates
          </p>
        </div>
        <Switch
          checked={pushNotifications}
          onCheckedChange={setPushNotifications}
        />
      </div>
    </div>
  );

  const renderDataControlsSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Data sharing</h3>
          <p className="text-xs text-gray-500 mt-1">
            Allow anonymous usage data to improve the service
          </p>
        </div>
        <Switch
          checked={dataSharing}
          onCheckedChange={setDataSharing}
        />
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">Two-factor authentication</h3>
          <p className="text-xs text-gray-500 mt-1">
            Add an extra layer of security to your account
          </p>
        </div>
        <Switch
          checked={twoFactorAuth}
          onCheckedChange={setTwoFactorAuth}
        />
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'personalization':
        return (
          <div className="text-center py-8 text-gray-500">
            <p>Personalization settings coming soon</p>
          </div>
        );
      case 'connected-apps':
        return (
          <div className="text-center py-8 text-gray-500">
            <p>No connected apps yet</p>
          </div>
        );
      case 'data-controls':
        return renderDataControlsSettings();
      case 'security':
        return renderSecuritySettings();
      case 'account':
        return (
          <div className="text-center py-8 text-gray-500">
            <p>Account management coming soon</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[600px] p-0 bg-white">
        <DialogDescription className="sr-only">
          Manage your application settings and preferences
        </DialogDescription>
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 border-r">
            <DialogHeader className="p-4 border-b">
              <DialogTitle className="text-lg font-semibold">Settings</DialogTitle>
            </DialogHeader>
            <div className="p-2">
              {settingsSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                    activeSection === section.id
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <span>{section.icon}</span>
                  <span>{section.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold capitalize">{activeSection.replace('-', ' ')}</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onOpenChange(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
              {renderSectionContent()}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
