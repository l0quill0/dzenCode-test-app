'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Select, type SelectOption } from '@/components/common/select';
import { useI18n } from '@/contexts/i18n-context';

const PRODUCT_TYPE_OPTIONS: SelectOption[] = [
  { value: 'Monitors', label: 'Monitors' },
];

export function ProductsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useI18n();

  const selectedType = searchParams.get('type') ?? '';
  const [specification, setSpecification] = useState('');

  const handleTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('type', value);
    } else {
      params.delete('type');
    }
    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname);
  };

  return (
    <div className="ml-0 sm:ml-4 flex flex-wrap items-center gap-4 sm:gap-7">
      <Select
        id="product-type-filter"
        label={t.products.typeFilter}
        value={selectedType}
        onChange={handleTypeChange}
        options={PRODUCT_TYPE_OPTIONS}
        placeholder={t.products.allTypes}
      />

      <Select
        id="product-spec-filter"
        label={t.products.specificationFilter}
        value={specification}
        onChange={setSpecification}
        options={[]}
        placeholder={t.products.allSpecifications}
      />
    </div>
  );
}
