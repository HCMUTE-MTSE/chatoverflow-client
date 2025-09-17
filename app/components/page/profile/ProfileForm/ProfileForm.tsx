import * as React from 'react';
import Input from '../../../ui/Input/Input';
import Select from '../../../ui/Select/Select';
import Textarea from '../../../ui/Textarea/Textarea';
import DateTimePicker from '~/components/ui/DateTimePicker/DateTimePicker';
import { getUser, updateUser } from '~/services/api/user/user.service';
import {
  getProvinces,
  getWards,
} from '~/services/api/third-party/address.service';
import type { UserRequest } from '~/models/req/user.request';
import type { UserResponse } from '~/models/res/user.response';
import type { Address, Province, Ward } from '~/models/constant/Address.dto';
import profileLang from '~/lang/en/profile';

// Interface cho form data (mapping với UserRequest)
interface ProfileFormData {
  name: string;
  nickName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  province: string;
  ward: string;
  street: string;
}

const ProfileForm: React.FC = () => {
  const [formData, setFormData] = React.useState<ProfileFormData>({
    name: '',
    nickName: '',
    email: '',
    dateOfBirth: '',
    gender: '',
    province: '',
    ward: '',
    street: '',
  });

  const [loading, setLoading] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  // State cho provinces và wards
  const [provinces, setProvinces] = React.useState<Province[]>([]);
  const [wards, setWards] = React.useState<Ward[]>([]);
  const [loadingProvinces, setLoadingProvinces] = React.useState(false);
  const [loadingWards, setLoadingWards] = React.useState(false);

  // Load provinces khi component mount
  React.useEffect(() => {
    const loadProvinces = async () => {
      setLoadingProvinces(true);
      try {
        const provincesData = await getProvinces();
        setProvinces(provincesData);
      } catch (err) {
        console.error(profileLang.messages.errorLoadingProvinces, err);
      } finally {
        setLoadingProvinces(false);
      }
    };

    loadProvinces();
  }, []);

  // Load wards khi province thay đổi
  React.useEffect(() => {
    const loadWards = async () => {
      if (!formData.province) {
        setWards([]);
        return;
      }

      setLoadingWards(true);
      try {
        const wardsData = await getWards(formData.province);
        // Đảm bảo wardsData là array
        setWards(Array.isArray(wardsData) ? wardsData : []);
      } catch (err) {
        console.error(profileLang.messages.errorLoadingWards, err);
        setWards([]);
      } finally {
        setLoadingWards(false);
      }
    };

    loadWards();
  }, [formData.province]);

  // Load user data khi component mount và khi provinces đã load xong
  React.useEffect(() => {
    const loadUserData = async () => {
      // Chỉ load user data khi provinces đã có
      if (provinces.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getUser();
        if (response.success && response.data) {
          const userData: UserResponse = response.data;

          // Convert ISO date string to YYYY-MM-DD format for HTML input date
          let formattedDate = '';
          if (userData.dateOfBirth) {
            const date = new Date(userData.dateOfBirth);
            if (!isNaN(date.getTime())) {
              formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
            }
          }

          // Tìm province code từ name để hiển thị trong select
          const selectedProvince = provinces.find(
            (p) => p.name === userData.address?.province
          );
          const provinceCode = selectedProvince?.code.toString() || '';

          setFormData({
            name: userData.name || '',
            nickName: userData.nickName || '',
            email: userData.email || '',
            dateOfBirth: formattedDate,
            gender: userData.gender || '',
            province: provinceCode, // Lưu code để hiển thị trong select
            ward: '', // Sẽ được cập nhật sau khi load wards
            street: userData.address?.street || '',
          });

          // Load wards sau khi có province để tìm ward code
          if (provinceCode && userData.address?.ward) {
            try {
              const wardsData = await getWards(provinceCode);
              // Đảm bảo wardsData là array trước khi gọi find
              if (Array.isArray(wardsData)) {
                const selectedWard = wardsData.find(
                  (w) => w.name === userData.address?.ward
                );
                const wardCode = selectedWard?.code.toString() || '';

                setFormData((prev) => ({
                  ...prev,
                  ward: wardCode, // Lưu code để hiển thị trong select
                }));
              }
            } catch (err) {
              console.error(profileLang.messages.errorLoadingWardsForUser, err);
            }
          }
        }
      } catch (err: any) {
        setError(profileLang.messages.errorLoadingUser);
        console.error('Load user error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [provinces]); // Thêm provinces vào dependency

  // Options for select components using internationalization
  const genderOptions = [
    { value: 'male', label: profileLang.genderOptions.male },
    { value: 'female', label: profileLang.genderOptions.female },
    { value: 'other', label: profileLang.genderOptions.other },
    {
      value: 'prefer-not-to-say',
      label: profileLang.genderOptions.preferNotToSay,
    },
  ];

  // Convert provinces to select options
  const provinceOptions = provinces.map((province) => ({
    value: province.code.toString(),
    label: province.name,
  }));

  // Convert wards to select options
  const wardOptions = Array.isArray(wards)
    ? wards.map((ward) => ({
        value: ward.code.toString(),
        label: ward.name,
      }))
    : [];

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => {
      // Reset ward when province changes
      if (field === 'province') {
        return {
          ...prev,
          [field]: value,
          ward: '', // Reset ward when province changes
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });

    // Clear success/error messages when user starts editing
    if (success) setSuccess(null);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      // Tìm tên province và ward từ code để lưu vào database
      const selectedProvince = provinces.find(
        (p) => p.code.toString() === formData.province
      );
      const selectedWard = wards.find(
        (w) => w.code.toString() === formData.ward
      );

      // Convert form data to UserRequest format
      const address: Address = {
        province: selectedProvince?.name || formData.province, // Lưu name thay vì code
        ward: selectedWard?.name || formData.ward, // Lưu name thay vì code
        street: formData.street,
      };

      const userRequest: UserRequest = {
        name: formData.name,
        nickName: formData.nickName,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        address: address,
      };

      const response = await updateUser(userRequest);

      if (response.success) {
        setSuccess(profileLang.messages.success);
      } else {
        setError(response.message || profileLang.messages.updateFailed);
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || profileLang.messages.errorUpdating
      );
      console.error('Update user error:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-white text-lg">{profileLang.loading.userInfo}</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h1 className="text-white text-3xl font-bold mb-6">
        {profileLang.title}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Error/Success Messages */}
        {error && (
          <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-900/50 border border-green-500 text-green-200 px-4 py-3 rounded-md">
            {success}
          </div>
        )}

        {/* Basic Information Section */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-white mb-2">
            {profileLang.basicInfo}
          </h3>

          <Input
            label={profileLang.labels.fullName}
            value={formData.name}
            onChange={(value) => handleInputChange('name', value)}
            placeholder={profileLang.placeholders.fullName}
            hint={profileLang.hints.fullName}
            required
          />
        </div>

        {/* Personal Information Section */}
        <div className="grid md:grid-cols-2 gap-3">
          <Input
            label={profileLang.labels.nickname}
            value={formData.nickName}
            onChange={(value) => handleInputChange('nickName', value)}
            placeholder={profileLang.placeholders.nickname}
            hint={profileLang.hints.nickname}
            required
          />

          <div className="relative">
            <Input
              label={profileLang.labels.email}
              type="email"
              value={formData.email}
              onChange={(value) => handleInputChange('email', value)}
              placeholder={profileLang.placeholders.email}
              hint={profileLang.hints.email}
              required
              disabled={true}
            />
            {/* Lock icon overlay */}
            <div className="absolute top-8 right-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Personal Details Section */}
        <div className="grid md:grid-cols-2 gap-3">
          <DateTimePicker
            label={profileLang.labels.dateOfBirth}
            value={formData.dateOfBirth}
            onChange={(value) => handleInputChange('dateOfBirth', value)}
            hint={profileLang.hints.dateOfBirth}
            required
          />

          <Select
            label={profileLang.labels.gender}
            value={formData.gender}
            onChange={(value) => handleInputChange('gender', value)}
            options={genderOptions}
            placeholder={profileLang.placeholders.gender}
            hint={profileLang.hints.gender}
            required
          />
        </div>

        {/* Address Section */}
        <div className="border-t border-gray-700 pt-2">
          <h3 className="text-lg font-semibold text-white mb-2">
            {profileLang.addressInfo}
          </h3>

          {/* Province and Ward in Grid */}
          <div className="grid md:grid-cols-2 gap-3 mb-2">
            <Select
              label={profileLang.labels.province}
              value={formData.province}
              onChange={(value) => handleInputChange('province', value)}
              options={provinceOptions}
              placeholder={
                loadingProvinces
                  ? profileLang.loading.provinces
                  : profileLang.placeholders.province
              }
              hint={profileLang.hints.province}
              disabled={loadingProvinces}
              required
            />

            <Select
              label={profileLang.labels.ward}
              value={formData.ward}
              onChange={(value) => handleInputChange('ward', value)}
              options={wardOptions}
              placeholder={
                loadingWards
                  ? profileLang.loading.wards
                  : profileLang.placeholders.ward
              }
              hint={profileLang.hints.ward}
              disabled={!formData.province || loadingWards}
              required
            />
          </div>

          <Textarea
            label={profileLang.labels.street}
            value={formData.street}
            onChange={(value) => handleInputChange('street', value)}
            placeholder={profileLang.placeholders.street}
            hint={profileLang.hints.street}
            rows={2}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="border-t border-gray-700 pt-3 flex justify-center">
          <button
            type="submit"
            disabled={saving}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
          >
            {saving ? profileLang.buttons.saving : profileLang.buttons.save}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
