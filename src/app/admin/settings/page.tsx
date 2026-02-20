"use client";

import { useEffect, useState } from "react";
import { Save, Loader2 } from "lucide-react";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const updateSetting = (key: string, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-red" />
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Site Settings</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="btn-primary disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          {saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="space-y-6">
        {/* General Settings */}
        <div className="admin-card">
          <h2 className="mb-4 text-lg font-bold text-gray-800">General</h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Site Name
              </label>
              <input
                type="text"
                value={settings.site_name || ""}
                onChange={(e) => updateSetting("site_name", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Tagline
              </label>
              <input
                type="text"
                value={settings.site_tagline || ""}
                onChange={(e) => updateSetting("site_tagline", e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="admin-card">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            Hero Section
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Hero Title
              </label>
              <input
                type="text"
                value={settings.hero_title || ""}
                onChange={(e) => updateSetting("hero_title", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Hero Subtitle
              </label>
              <textarea
                value={settings.hero_subtitle || ""}
                onChange={(e) =>
                  updateSetting("hero_subtitle", e.target.value)
                }
                className="input-field"
                rows={2}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Hero Image URL
              </label>
              <input
                type="url"
                value={settings.hero_image || ""}
                onChange={(e) => updateSetting("hero_image", e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Delivery & Pricing */}
        <div className="admin-card">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            Delivery & Pricing
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Delivery Fee ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.delivery_fee || ""}
                onChange={(e) =>
                  updateSetting("delivery_fee", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Free Delivery Minimum ($)
              </label>
              <input
                type="number"
                step="0.01"
                value={settings.free_delivery_minimum || ""}
                onChange={(e) =>
                  updateSetting("free_delivery_minimum", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Currency Symbol
              </label>
              <input
                type="text"
                value={settings.currency_symbol || ""}
                onChange={(e) =>
                  updateSetting("currency_symbol", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Currency Code
              </label>
              <input
                type="text"
                value={settings.currency_code || ""}
                onChange={(e) =>
                  updateSetting("currency_code", e.target.value)
                }
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="admin-card">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            Contact Information
          </h2>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={settings.phone || ""}
                  onChange={(e) => updateSetting("phone", e.target.value)}
                  className="input-field"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.email || ""}
                  onChange={(e) => updateSetting("email", e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                value={settings.address || ""}
                onChange={(e) => updateSetting("address", e.target.value)}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Opening Hours */}
        <div className="admin-card">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            Opening Hours
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Weekday Hours
              </label>
              <input
                type="text"
                value={settings.hours_weekday || ""}
                onChange={(e) =>
                  updateSetting("hours_weekday", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Saturday Hours
              </label>
              <input
                type="text"
                value={settings.hours_saturday || ""}
                onChange={(e) =>
                  updateSetting("hours_saturday", e.target.value)
                }
                className="input-field"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sunday Hours
              </label>
              <input
                type="text"
                value={settings.hours_sunday || ""}
                onChange={(e) =>
                  updateSetting("hours_sunday", e.target.value)
                }
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="admin-card">
          <h2 className="mb-4 text-lg font-bold text-gray-800">
            About Section
          </h2>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              About Text
            </label>
            <textarea
              value={settings.about_text || ""}
              onChange={(e) => updateSetting("about_text", e.target.value)}
              className="input-field"
              rows={4}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
