import * as React from 'react';
import { useLocation } from 'react-router';
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
  bio: string;
  dateOfBirth: string;
  gender: string;
  province: string;
  ward: string;
  street: string;
}

// Interface cho router state
interface RouterState {
  userData?: UserResponse;
}

const ProfileForm: React.FC = () => {
  const location = useLocation();
  const routerState = location.state as RouterState | null;

  const [formData, setFormData] = React.useState<ProfileFormData>({
    name: '',
    nickName: '',
    email: '',
    bio: '',
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

  // Load user data - Ưu tiên router state, fallback API
  React.useEffect(() => {
    const loadUserData = async () => {
      if (provinces.length === 0) return;

      setLoading(true);
      setError(null);

      try {
        let userData: UserResponse;

        if (routerState?.userData) {
          userData = routerState.userData;
        } else {
          const response = await getUser();
          if (response.success && response.data) {
            userData = response.data;
          } else {
            throw new Error('Failed to fetch user data');
          }
        }

        // Format date cho HTML input
        let formattedDate = '';
        if (userData.dateOfBirth) {
          const date = new Date(userData.dateOfBirth);
          if (!isNaN(date.getTime())) {
            formattedDate = date.toISOString().split('T')[0];
          }
        }

        // Tìm province code
        const selectedProvince = provinces.find(
          (p) => p.name === userData.address?.province
        );
        const provinceCode = selectedProvince?.code.toString() || '';

        setFormData({
          name: userData.name || '',
          nickName: userData.nickName || '',
          email: userData.email || '',
          bio: userData.bio || '',
          dateOfBirth: formattedDate,
          gender: userData.gender || '',
          province: provinceCode,
          ward: '',
          street: userData.address?.street || '',
        });

        // Load wards và set ward nếu có
        if (provinceCode && userData.address?.ward) {
          try {
            const wardsData = await getWards(provinceCode);
            if (Array.isArray(wardsData)) {
              const selectedWard = wardsData.find(
                (w) => w.name === userData.address?.ward
              );
              const wardCode = selectedWard?.code.toString() || '';

              setFormData((prev) => ({
                ...prev,
                ward: wardCode,
              }));
            }
          } catch (err) {
            console.error(profileLang.messages.errorLoadingWardsForUser, err);
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
  }, [provinces, routerState]);

  // Options for select components
  const genderOptions = [
    { value: 'male', label: profileLang.genderOptions.male },
    { value: 'female', label: profileLang.genderOptions.female },
    { value: 'other', label: profileLang.genderOptions.other },
    {
      value: 'prefer-not-to-say',
      label: profileLang.genderOptions.preferNotToSay,
    },
  ];

  const provinceOptions = provinces.map((province) => ({
    value: province.code.toString(),
    label: province.name,
  }));

  const wardOptions = Array.isArray(wards)
    ? wards.map((ward) => ({
        value: ward.code.toString(),
        label: ward.name,
      }))
    : [];

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setFormData((prev) => {
      if (field === 'province') {
        return {
          ...prev,
          [field]: value,
          ward: '',
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });

    if (success) setSuccess(null);
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const selectedProvince = provinces.find(
        (p) => p.code.toString() === formData.province
      );
      const selectedWard = wards.find(
        (w) => w.code.toString() === formData.ward
      );

      const address: Address = {
        province: selectedProvince?.name || formData.province,
        ward: selectedWard?.name || formData.ward,
        street: formData.street,
      };

      const userRequest: UserRequest = {
        name: formData.name,
        nickName: formData.nickName,
        bio: formData.bio,
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

          <Textarea
            label={profileLang.labels.bio}
            value={formData.bio}
            onChange={(value) => handleInputChange('bio', value)}
            placeholder={profileLang.placeholders.bio}
            hint={profileLang.hints.bio}
            rows={3}
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
